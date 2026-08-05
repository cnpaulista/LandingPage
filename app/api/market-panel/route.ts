import { NextResponse } from "next/server";

export const revalidate = 900;

const TTL_SECONDS = 900;
const FETCH_TIMEOUT_MS = 5000;

type MarketCardId = "usd" | "eur" | "ibovespa" | "selic" | "agro" | "economy";
type Trend = "up" | "down" | "flat";

type MarketNewsItem = {
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string | null;
};

type MarketPanelCard = {
  id: MarketCardId;
  title: string;
  kind: "indicator" | "news-list";
  status: "available" | "partial" | "unavailable";
  primary: string;
  secondary: string | null;
  updatedAt: string | null;
  sourceName: string | null;
  trend: Trend | null;
  variationPercent: number | null;
  relatedNews: MarketNewsItem | null;
  news: MarketNewsItem[];
};

type CurrencyQuote = {
  bid?: string;
  pctChange?: string;
  create_date?: string;
};

type RssSource = {
  name: string;
  url: string;
  keywords: string[];
};

const agroSources: RssSource[] = [
  {
    name: "Canal Rural",
    url: "https://www.canalrural.com.br/feed/",
    keywords: ["agronegocio", "agronegócio", "soja", "milho", "pecuaria", "pecuária", "clima", "exportacao", "exportação"],
  },
  {
    name: "Agrolink",
    url: "https://www.agrolink.com.br/rss/noticias.xml",
    keywords: ["agronegocio", "agronegócio", "soja", "milho", "pecuaria", "pecuária", "clima", "exportacao", "exportação", "safra"],
  },
];

const economySources: RssSource[] = [
  {
    name: "Agencia Brasil",
    url: "https://agenciabrasil.ebc.com.br/rss/economia/feed.xml",
    keywords: ["economia", "inflacao", "inflação", "pib", "mercado financeiro", "empresas", "governo", "selic", "copom", "juros"],
  },
];

export async function GET() {
  const generatedAt = new Date();
  const expiresAt = new Date(generatedAt.getTime() + TTL_SECONDS * 1000);

  const [currencies, ibovespa, selic, agroNews, economyNews] = await Promise.all([
    fetchCurrencies(),
    fetchIbovespa(),
    fetchSelic(),
    fetchNews(agroSources, 3),
    fetchNews(economySources, 3),
  ]);

  return NextResponse.json(
    {
      generatedAt: generatedAt.toISOString(),
      cache: {
        ttlSeconds: TTL_SECONDS,
        expiresAt: expiresAt.toISOString(),
        hit: false,
      },
      cards: {
        usd: buildCurrencyCard("usd", "Dólar", currencies.usd, economyNews[0] ?? null),
        eur: buildCurrencyCard("eur", "Euro", currencies.eur, economyNews[0] ?? null),
        ibovespa: buildIbovespaCard(ibovespa, economyNews[0] ?? null),
        selic: buildSelicCard(selic, economyNews.find((item) => matches(item, ["selic", "copom", "juros"])) ?? economyNews[0] ?? null),
        agro: buildNewsListCard("agro", "Agro", agroNews),
        economy: buildNewsListCard("economy", "Economia", economyNews),
      },
    },
    {
      headers: {
        "Cache-Control": `public, max-age=60, s-maxage=${TTL_SECONDS}, stale-while-revalidate=300`,
      },
    },
  );
}

async function fetchCurrencies(): Promise<{ usd: CurrencyQuote | null; eur: CurrencyQuote | null }> {
  try {
    const data = (await fetchJson("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL")) as {
      USDBRL?: CurrencyQuote;
      EURBRL?: CurrencyQuote;
    };

    return {
      usd: data.USDBRL ?? null,
      eur: data.EURBRL ?? null,
    };
  } catch {
    return { usd: null, eur: null };
  }
}

async function fetchIbovespa() {
  try {
    const data = (await fetchJson("https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?range=1d&interval=1m")) as {
      chart?: {
        result?: Array<{
          meta?: {
            regularMarketPrice?: number;
            chartPreviousClose?: number;
            regularMarketTime?: number;
          };
        }>;
      };
    };
    const meta = data.chart?.result?.[0]?.meta;
    const current = meta?.regularMarketPrice;
    const previous = meta?.chartPreviousClose;

    if (typeof current !== "number" || typeof previous !== "number") return null;

    const variationPoints = current - previous;
    return {
      points: current,
      variationPoints,
      variationPercent: previous === 0 ? null : (variationPoints / previous) * 100,
      updatedAt: meta?.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function fetchSelic() {
  try {
    const data = (await fetchJson("https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json")) as Array<{
      data?: string;
      valor?: string;
    }>;
    const latest = data[0];
    if (!latest?.valor) return null;

    return {
      rate: Number(latest.valor.replace(",", ".")),
      updatedAt: parseBrazilianDate(latest.data),
    };
  } catch {
    return null;
  }
}

async function fetchNews(sources: RssSource[], limit: number): Promise<MarketNewsItem[]> {
  const batches = await Promise.all(
    sources.map(async (source) => {
      try {
        const xml = await fetchText(source.url);
        return parseRss(xml, source).filter((item) => matches(item, source.keywords));
      } catch {
        return [];
      }
    }),
  );

  return batches
    .flat()
    .sort((left, right) => Date.parse(right.publishedAt ?? "") - Date.parse(left.publishedAt ?? ""))
    .slice(0, limit);
}

function buildCurrencyCard(
  id: Extract<MarketCardId, "usd" | "eur">,
  title: string,
  quote: CurrencyQuote | null,
  relatedNews: MarketNewsItem | null,
): MarketPanelCard {
  if (!quote?.bid) return unavailableCard(id, title, "indicator");

  const variationPercent = quote.pctChange ? Number(quote.pctChange) : null;
  return {
    id,
    title,
    kind: "indicator",
    status: relatedNews ? "available" : "partial",
    primary: formatCurrency(Number(quote.bid)),
    secondary: formatVariation(variationPercent),
    updatedAt: quote.create_date ? new Date(quote.create_date.replace(" ", "T")).toISOString() : new Date().toISOString(),
    sourceName: "AwesomeAPI",
    trend: trendFrom(variationPercent),
    variationPercent,
    relatedNews,
    news: [],
  };
}

function buildIbovespaCard(data: Awaited<ReturnType<typeof fetchIbovespa>>, relatedNews: MarketNewsItem | null): MarketPanelCard {
  if (!data) return unavailableCard("ibovespa", "Ibovespa", "indicator");

  return {
    id: "ibovespa",
    title: "Ibovespa",
    kind: "indicator",
    status: relatedNews ? "available" : "partial",
    primary: `${Math.round(data.points).toLocaleString("pt-BR")} pts`,
    secondary: `${formatSigned(data.variationPoints, 0)} pts (${formatPercent(data.variationPercent)})`,
    updatedAt: data.updatedAt,
    sourceName: "Yahoo Finance",
    trend: trendFrom(data.variationPoints),
    variationPercent: data.variationPercent,
    relatedNews,
    news: [],
  };
}

function buildSelicCard(data: Awaited<ReturnType<typeof fetchSelic>>, relatedNews: MarketNewsItem | null): MarketPanelCard {
  if (!data) return unavailableCard("selic", "Selic / Juros", "indicator");

  return {
    id: "selic",
    title: "Selic / Juros",
    kind: "indicator",
    status: relatedNews ? "available" : "partial",
    primary: `${data.rate.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% a.a.`,
    secondary: "Taxa Selic meta",
    updatedAt: data.updatedAt,
    sourceName: "Banco Central do Brasil",
    trend: "flat",
    variationPercent: null,
    relatedNews,
    news: [],
  };
}

function buildNewsListCard(id: Extract<MarketCardId, "agro" | "economy">, title: string, news: MarketNewsItem[]): MarketPanelCard {
  return {
    id,
    title,
    kind: "news-list",
    status: news.length > 0 ? "available" : "unavailable",
    primary: news.length > 0 ? `${news.length} notícias recentes` : "Aguardando atualização",
    secondary: news.length > 0 ? "Atualização automática por RSS" : "Os dados aparecem automaticamente quando a API do CNP estiver disponível.",
    updatedAt: news[0]?.publishedAt ?? new Date().toISOString(),
    sourceName: news[0]?.source ?? null,
    trend: null,
    variationPercent: null,
    relatedNews: news[0] ?? null,
    news,
  };
}

function unavailableCard(id: MarketCardId, title: string, kind: MarketPanelCard["kind"]): MarketPanelCard {
  return {
    id,
    title,
    kind,
    status: "unavailable",
    primary: "Aguardando atualização",
    secondary: "Os dados aparecem automaticamente quando a API do CNP estiver disponível.",
    updatedAt: null,
    sourceName: null,
    trend: null,
    variationPercent: null,
    relatedNews: null,
    news: [],
  };
}

async function fetchJson(url: string) {
  const response = await fetchWithTimeout(url, "application/json");
  return response.json();
}

async function fetchText(url: string) {
  const response = await fetchWithTimeout(url, "application/rss+xml, application/xml, text/xml, */*");
  return response.text();
}

async function fetchWithTimeout(url: string, accept: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { Accept: accept, "User-Agent": "CNP-MarketPanel/1.0" },
      next: { revalidate: TTL_SECONDS },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

function parseRss(xml: string, source: RssSource): MarketNewsItem[] {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => {
    const item = match[0];
    return {
      title: cleanXml(readTag(item, "title")),
      summary: cleanXml(readTag(item, "description") || readTag(item, "content:encoded")).slice(0, 220),
      url: cleanXml(readTag(item, "link")),
      source: source.name,
      publishedAt: parseDate(readTag(item, "pubDate")),
    };
  });
}

function readTag(xml: string, tag: string): string {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return xml.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i"))?.[1] ?? "";
}

function cleanXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matches(item: MarketNewsItem, keywords: string[]): boolean {
  const haystack = normalize(`${item.title} ${item.summary}`);
  return keywords.some((keyword) => haystack.includes(normalize(keyword)));
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseDate(value: string): string | null {
  const timestamp = Date.parse(cleanXml(value));
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

function parseBrazilianDate(value?: string): string | null {
  if (!value) return null;
  const [day, month, year] = value.split("/");
  if (!day || !month || !year) return null;
  return new Date(`${year}-${month}-${day}T12:00:00-03:00`).toISOString();
}

function trendFrom(value: number | null): Trend {
  if (value === null || value === 0) return "flat";
  return value > 0 ? "up" : "down";
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 4 });
}

function formatVariation(value: number | null): string | null {
  if (value === null || Number.isNaN(value)) return null;
  return `${value >= 0 ? "+" : ""}${formatPercent(value)} no dia`;
}

function formatPercent(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "0,00%";
  return `${value >= 0 ? "+" : ""}${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}

function formatSigned(value: number, digits: number): string {
  return `${value >= 0 ? "+" : ""}${value.toLocaleString("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}`;
}
