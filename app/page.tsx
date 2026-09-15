import Image from "next/image";
import { headers } from "next/headers";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  Handshake,
  Landmark,
  Mail,
  MapPin,
  MessageSquareText,
  Minus,
  Newspaper,
  Percent,
  RefreshCw,
  Scale,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Target,
  UsersRound,
} from "lucide-react";
import SolutionsSection from "./components/SolutionsSection";
import { EspecialistasSection } from "./components/EspecialistasSection";
import { ProjetoSection } from "./components/ProjetoSection";
import { buscarEspecialistas } from "./components/especialistas";
import { cardsPresentes } from "./components/painelCards";
import { destinoCadastro, heroCopy } from "./components/heroContent";
import { VitrinePessoas, VITRINES } from "./components/VitrinePessoas";
export const revalidate = 600;
const pillars = [
  {
    icon: Handshake,
    title: "Networking que continua depois do encontro",
    text: "O empresário conhece a rede nos eventos e mantém o relacionamento ativo na plataforma, com contatos, oportunidades e parceiros sempre por perto.",
  },
  {
    icon: Store,
    title: "Vitrine para vender dentro da comunidade",
    text: "Produtos e serviços ganham espaço em um marketplace B2B voltado para quem quer comprar, vender e fechar parcerias com mais confiança.",
  },
  {
    icon: ShieldCheck,
    title: "Hub de soluções para o dia a dia empresarial",
    text: "Jurídico, contábil, crédito, licenças, marketing, cursos, benefícios e oportunidades ficam organizados em uma experiência clara para o associado.",
  },
];
const differentiators = [
  {
    icon: UsersRound,
    title: "Mais que um clube de networking",
    text: "O CNP não apenas aproxima empresários. A rede organiza demandas, parceiros e oportunidades para transformar contato em ação concreta.",
  },
  {
    icon: BadgeCheck,
    title: "Especialistas e fornecedores validados",
    text: "A plataforma privilegia profissionais selecionados por área de atuação, especialidade e aderência ao perfil da comunidade.",
  },
  {
    icon: MapPin,
    title: "Organização por região e especialidade",
    text: "Demandas jurídicas, contábeis, financeiras, sanitárias e de marketing podem ser direcionadas com mais contexto, evitando uma vitrine sem filtro.",
  },
];
const highlights = [
  { icon: UsersRound, text: "Networking qualificado" },
  { icon: Building2, text: "Soluções completas para sua empresa" },
  { icon: Handshake, text: "Conexões que geram resultados" },
  { icon: Target, text: "Foco no crescimento do seu negócio" },
];
const participation = [
  {
    name: "Associado",
    forWho: "Para empresários e empreendedores",
    features: ["Perfil de negócio", "Marketplace da comunidade", "Eventos e rodadas", "Benefícios e conteúdos"],
  },
  {
    name: "Fornecedor",
    forWho: "Para quem vende produtos ou serviços",
    features: ["Vitrine empresarial", "Contato com associados", "Exposição em categorias", "Oportunidades qualificadas"],
  },
  {
    name: "Parceiro especialista",
    forWho: "Para profissionais de apoio ao negócio",
    features: ["Demandas por categoria", "Autoridade na rede", "Relacionamento recorrente", "Participação em ações do clube"],
  },
];
type MarketCardId =
  | "usd"
  | "eur"
  | "ibovespa"
  | "selic"
  | "cdi"
  | "economy"
  | "politica"
  | "stf";
type MarketNewsItem = {
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string | null;
  /**
   * SPEC-018 - nulo e o caso COMUM, e nao a excecao.
   *
   * O Back so preenche quando a fonte declara a imagem em campo proprio do feed
   * E o host e de fonte publica (D-018-04). Veiculo comercial chega nulo por
   * desenho. A UI trata a ausencia sem deixar buraco.
   */
  imageUrl?: string | null;
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
  trend: "up" | "down" | "flat" | null;
  variationPercent: number | null;
  relatedNews: MarketNewsItem | null;
  news: MarketNewsItem[];
};
type MarketPanelPayload = {
  generatedAt: string | null;
  cache: {
    ttlSeconds: number;
    expiresAt: string | null;
    hit: boolean;
  };
  /*
    PARCIAL DE PROPOSITO. Isto vem de `as MarketPanelPayload` sobre JSON de
    fora — o `as` nao valida nada, entao um registro TOTAL era o compilador
    afirmando o que ele nao tem como saber. Em 2026-09-12 essa mentira custou
    uma queda: a landing pediu `politica` e `stf` a um Back que ainda nao os
    publicava, e `cards[id].trend` estourou em toda requisicao.
  */
  cards: Partial<Record<MarketCardId, MarketPanelCard>>;
};
/*
 * SPEC-018 - politica e STF entram DEPOIS das editorias antigas.
 *
 * A ordem e de leitura, nao de importancia: os quatro indicadores abrem o
 * painel porque sao a informacao que cabe num relance, e as listas de noticia
 * vem em seguida porque exigem parada.
 */
/*
 * SPEC-020 - DUAS LISTAS, porque sao duas coisas.
 *
 * Ate aqui indicador e editoria dividiam a mesma grade e, com isso, a mesma
 * altura de cartao. Numero de cotacao ocupando a area de uma materia dava a ele
 * um peso que ele nao tem, e empurrava a primeira noticia para fora da primeira
 * tela no celular. O portal de referencia que o dono enviou faz o contrario:
 * faixa fina de numeros no topo, materias logo abaixo.
 *
 * Selic e CDI abrem porque sao as duas taxas, e ficam lado a lado no print.
 */
const indicadorOrder: MarketCardId[] = ["selic", "cdi", "usd", "eur", "ibovespa"];
/** Editorias, em ordem de leitura. `agro` saiu na SPEC-020: 0 de 3 com foto. */
const editoriaOrder: MarketCardId[] = ["economy", "politica", "stf"];
async function fetchMarketPanel(): Promise<MarketPanelPayload | null> {
  const baseUrl = process.env.NEXT_PUBLIC_CNP_API_BASE_URL ?? process.env.CNP_API_BASE_URL;
  let panelUrl: string | null = null;
  if (baseUrl) {
    panelUrl = `${baseUrl.replace(/\/$/, "")}/v1/public/market-panel`;
  } else {
    const requestHeaders = await headers();
    const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
    if (!host) return null;
    const protocol =
      requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
    panelUrl = `${protocol}://${host}/api/market-panel`;
  }
  try {
    const response = await fetch(
      panelUrl,
      baseUrl
        ? {
            next: { revalidate: 600 },
          }
        : {
            cache: "no-store",
          },
    );
    if (!response.ok) return null;
    return (await response.json()) as MarketPanelPayload;
  } catch {
    return null;
  }
}
function createFallbackMarketPanel(): MarketPanelPayload {
  const makeCard = (
    id: MarketCardId,
    title: string,
    kind: MarketPanelCard["kind"] = "indicator",
  ): MarketPanelCard => ({
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
  });
  return {
    generatedAt: null,
    cache: { ttlSeconds: 900, expiresAt: null, hit: false },
    cards: {
      usd: makeCard("usd", "Dólar"),
      eur: makeCard("eur", "Euro"),
      ibovespa: makeCard("ibovespa", "Ibovespa"),
      selic: makeCard("selic", "Selic / Juros"),
      cdi: makeCard("cdi", "CDI"),
      economy: makeCard("economy", "Economia", "news-list"),
      politica: makeCard("politica", "Política", "news-list"),
      stf: makeCard("stf", "STF", "news-list"),
    },
  };
}
function formatPanelDate(value: string | null): string {
  if (!value) return "atualização pendente";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}
function formatNewsDate(value: string | null): string {
  if (!value) return "Agora";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}
function formatVariation(value: number | null): string | null {
  if (value === null) return null;
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}%`;
}
function marketIcon(id: MarketCardId) {
  if (id === "politica") return Landmark;
  if (id === "stf") return Scale;
  if (id === "ibovespa") return BarChart3;
  if (id === "selic") return Landmark;
  if (id === "cdi") return Percent;
  if (id === "economy") return Newspaper;
  return CircleDollarSign;
}
function trendIcon(trend: MarketPanelCard["trend"]) {
  if (trend === "up") return ArrowUpRight;
  if (trend === "down") return ArrowDownRight;
  return Minus;
}
function statusLabel(status: MarketPanelCard["status"]) {
  if (status === "available") return "Atualizado";
  if (status === "partial") return "Parcial";
  return "Indisponível";
}
export default async function Home() {
  const especialistas = await buscarEspecialistas();
  const marketPanel = (await fetchMarketPanel()) ?? createFallbackMarketPanel();
  return (
    <main>
      <section className="hero" id="inicio">
        <Image
          className="heroImage"
          src="/images/cnp-hero-networking.png"
          alt="Empresários em um jantar de negócios do CNP"
          fill
          priority
          sizes="100vw"
        />
        <div className="heroShade" />
        <header className="nav">
          <a className="brand" href="#inicio" aria-label="Início CNP">
            <Image
              src="/images/cnp-logo-transparent.png"
              alt="CNP Clube de Negócios Paulista"
              width={180}
              height={120}
              priority
            />
          </a>
          <nav className="navLinks" aria-label="Navegação principal">
            <a href="#solucoes">Soluções</a>
            <a href="#noticias">Notícias</a>
            <a href="#produto">Produto</a>
            <a href="#diferencial">Diferencial</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#participar">Participar</a>
          </nav>
          {/* SPEC-016:TASK-003 - AC-007. Era `#contato`, a faixa do `mailto:`. */}
          <a className="navCta" href={destinoCadastro}>
            <span>Fazer parte</span>
            <ArrowRight size={18} aria-hidden />
          </a>
        </header>
        {/*
          SPEC-016:TASK-001 - AC-001 / AC-002.
          O texto NAO e literal aqui: ele vive em `components/heroContent.ts` e
          e comparado caractere a caractere por `heroContent.test.ts`. O motivo
          esta na RISK-002 da spec — esta copy chegou ao projeto como imagem, e
          transcricao de imagem erra em acento e em virgula.
        */}
        <div className="heroContent">
          <p className="eyebrow">
            <Sparkles size={18} aria-hidden />
            {heroCopy.eyebrow}
          </p>
          <h1>{heroCopy.titulo}</h1>
          <p className="heroLead">{heroCopy.subtitulo}</p>
          {heroCopy.paragrafos.map((paragrafo) => (
            <p className="heroSupport" key={paragrafo}>
              {paragrafo}
            </p>
          ))}
          <div className="heroActions">
            {/*
              SPEC-016:TASK-003 - AC-007. Antes desta linha o botao apontava
              para `#participar`, que rolava a pagina ate a faixa cujo unico
              botao era `mailto:`. O caminho para o cadastro existia so no
              papel (SPEC-015:REQ-001, PLANEJADO desde 2026-08-11).
            */}
            <a className="primaryBtn" href={heroCopy.ctaPrimario.href}>
              {heroCopy.ctaPrimario.rotulo}
              <ArrowRight size={20} aria-hidden />
            </a>
            <a className="secondaryBtn" href={heroCopy.ctaSecundario.href}>
              {heroCopy.ctaSecundario.rotulo}
            </a>
          </div>
        </div>
      </section>
      <SolutionsSection />
      {/*
        SPEC-015:AC-007 - a lista vem da rota publica, que deriva do
        consentimento. Nao ha props curadas aqui, e o bloco some sozinho quando
        ninguem consentiu.
      */}
      <EspecialistasSection especialistas={especialistas} />
      {/*
        Secao "O projeto", alvo do botao secundario do hero. Fica aqui, e nao
        colada no hero, porque a abertura dela e escura: logo depois de
        Solucoes (fundo claro) e antes da faixa de destaques (escura), os
        fundos alternam em vez de emendar.
      */}
      <ProjetoSection />
      <section className="highlightBand" aria-label="Pilares da experiência CNP">
        {highlights.map((item) => (
          <div key={item.text}>
            <item.icon size={30} strokeWidth={1.8} aria-hidden />
            <span>{item.text}</span>
          </div>
        ))}
      </section>
      <section className="marketBand" id="noticias">
        <div className="marketHeading">
          <div>
            <p className="kicker">Notícias e indicadores</p>
            <h2>Um painel vivo para acompanhar o que mexe com empresas, economia e mercado.</h2>
          </div>
          <p className="marketMeta">
            <RefreshCw size={18} aria-hidden />
            Atualizado em {formatPanelDate(marketPanel.generatedAt)}
          </p>
        </div>
        {/*
          SPEC-020 / AC-005 - A FAIXA DE INDICADORES.
          Rotulo, valor e unidade, e nada mais. O que saiu daqui foi a noticia
          de apoio: ela existia porque o indicador ocupava um cartao inteiro e
          sobrava espaco, e o efeito medido em producao era Dolar, Euro e
          Ibovespa exibindo TODOS a mesma manchete do INPC. Tres repeticoes do
          mesmo texto, que na tela parecia defeito.
          A noticia nao se perdeu: ela continua no card de Economia, que e o
          lugar dela.
        */}
        <div className="marketFaixa">
          {cardsPresentes(indicadorOrder, marketPanel.cards).map((card) => {
            const Trend = trendIcon(card.trend);
            const variation = formatVariation(card.variationPercent);
            return (
              <div className={`faixaItem ${card.status}`} key={card.id}>
                <span className="faixaRotulo">{card.title}</span>
                <strong className="faixaValor">{card.primary}</strong>
                <span className="faixaRodape">
                  {card.secondary ?? statusLabel(card.status)}
                  {variation ? (
                    <span className={`marketTrend ${card.trend ?? "flat"}`}>
                      <Trend size={14} aria-hidden />
                      {variation}
                    </span>
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
        <div className="marketGrid">
          {cardsPresentes(editoriaOrder, marketPanel.cards).map((card) => {
            const Icon = marketIcon(card.id);
            const Trend = trendIcon(card.trend);
            const variation = formatVariation(card.variationPercent);
            /*
              SPEC-018 - A MANCHETE DE DESTAQUE PREFERE O ITEM QUE TEM FOTO.
              Antes era sempre o mais recente, e o efeito medido foi o pedido do
              cliente virando quase invisivel: o mais recente costuma ser do G1,
              que chega sem imagem por decisao (D-018-04), e a foto da Agencia
              Brasil caia para a lista de baixo, onde nao ha imagem. O painel
              inteiro ficava com UMA foto.
              Isto e escolha de APRESENTACAO, e nao editorial: os tres itens
              continuam visiveis, com a mesma informacao e o mesmo link. O que
              muda e qual deles ocupa o espaco grande — e ocupar espaco grande
              sem foto e justamente o que desperdica o espaco.
              Indicador continua com `relatedNews`, que o Back escolhe por
              ASSUNTO — a noticia de juros ao lado da Selic. Trocar aquela por
              "a que tem foto" quebraria a relacao entre o numero e o texto.
              E por isso a regra ramifica por `kind` em vez de encadear os dois:
              `relatedNews` vem preenchido TAMBEM nos cards de lista (e sempre
              igual a `news[0]`), entao um `??` simples curto-circuitava e a
              preferencia por foto nunca chegava a rodar. Medido: o painel
              inteiro ficava com uma imagem so.
            */
            const leadNews =
              card.kind === "indicator"
                ? (card.relatedNews ?? card.news[0] ?? null)
                : (card.news.find((item) => item.imageUrl) ?? card.news[0] ?? null);
            return (
              <article className={`marketCard ${card.kind === "news-list" ? "newsListCard" : "indicatorCard"}`} key={card.id}>
                <div className="marketCardTop">
                  <span className={`marketStatus ${card.status}`}>{statusLabel(card.status)}</span>
                  <Icon size={26} aria-hidden />
                </div>
                <h3>{card.title}</h3>
                {/*
                  SPEC-018 - O CABECALHO DE CONTAGEM SO VALE PARA INDICADOR.
                  Num card de lista, `primary` era "3 noticias recentes" e
                  `secondary` repetia o titulo da primeira materia — que logo
                  abaixo aparece de novo, grande, sobre a foto do destaque. Eram
                  tres repeticoes da mesma informacao antes de qualquer noticia
                  nova comecar, e no celular isso custava uma tela inteira de
                  rolagem. A referencia do cliente vai do nome da editoria
                  direto para o destaque.
                  O indicador mantem tudo: ali `primary` e a cotacao, que e o
                  conteudo do card, e nao um resumo do que vem depois.
                */}
                {card.kind === "indicator" ? (
                  <>
                    <div className="marketPrimaryRow">
                      <strong>{card.primary}</strong>
                      {variation ? (
                        <span className={`marketTrend ${card.trend ?? "flat"}`}>
                          <Trend size={17} aria-hidden />
                          {variation}
                        </span>
                      ) : null}
                    </div>
                    {card.secondary ? <p className="marketSecondary">{card.secondary}</p> : null}
                    <p className="marketUpdated">Atualização: {formatPanelDate(card.updatedAt)}</p>
                  </>
                ) : null}
                {card.kind === "news-list" ? (
                  <>
                    {/*
                      SPEC-018 - FORMATO DE PORTAL, pedido pelo dono em
                      2026-09-11 a partir de uma referencia de celular.
                      A estrutura e a da referencia: um DESTAQUE com a foto
                      grande e o titulo sobre ela, e depois itens horizontais
                      com miniatura a esquerda. O que muda entre desktop e
                      celular e so o CSS — a marcacao e uma so, porque duas
                      arvores para o mesmo conteudo divergem na primeira
                      manutencao.
                      Item sem foto NAO vira moldura vazia: a classe muda e o
                      layout colapsa para so texto. Com a D-018-05 isso passou a
                      ser minoria, mas continua acontecendo (o feed do STF nao
                      publica imagem nenhuma).
                    */}
                    {leadNews ? (
                      <a
                        className={`marketDestaque${leadNews.imageUrl ? " comFoto" : ""}`}
                        href={leadNews.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        {leadNews.imageUrl ? (
                          <Image
                            className="marketDestaqueFoto"
                            src={leadNews.imageUrl}
                            alt=""
                            width={640}
                            height={360}
                            sizes="(max-width: 980px) 100vw, 380px"
                          />
                        ) : null}
                        <div className="marketDestaqueTexto">
                          <span className="marketSelo">Destaque</span>
                          <p className="marketDestaqueHeadline">{leadNews.title}</p>
                          <span className="marketCredito">
                            {leadNews.source} · {formatNewsDate(leadNews.publishedAt)}
                          </span>
                        </div>
                      </a>
                    ) : null}
                    <ul className="marketNewsList">
                      {card.news.length > 0 ? (
                        card.news
                          .filter((item) => item.url !== leadNews?.url)
                          .map((item) => (
                            <li key={item.url}>
                              <a
                                className={item.imageUrl ? "comMiniatura" : undefined}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                              >
                                {item.imageUrl ? (
                                  <Image
                                    className="marketMiniatura"
                                    src={item.imageUrl}
                                    alt=""
                                    width={160}
                                    height={120}
                                    sizes="104px"
                                  />
                                ) : null}
                                <span className="marketItemTexto">
                                  <strong>{item.title}</strong>
                                  <span className="marketCredito">
                                    {item.source} · {formatNewsDate(item.publishedAt)}
                                  </span>
                                </span>
                              </a>
                            </li>
                          ))
                      ) : (
                        <li>
                          <span className="marketItemTexto">{card.secondary}</span>
                        </li>
                      )}
                    </ul>
                  </>
                ) : leadNews ? (
                  <a
                    className="marketRelated"
                    href={leadNews.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <div className="marketArticleMeta">
                      <span>{leadNews.source}</span>
                      <time>{formatNewsDate(leadNews.publishedAt)}</time>
                    </div>
                    <p className="marketHeadline">{leadNews.title}</p>
                    <p>{leadNews.summary || leadNews.title}</p>
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
      <section className="section intro" id="beneficios">
        <div className="sectionHeading">
          <p className="kicker">CNP Conecta</p>
          <h2>O CNP aproxima quem precisa vender, comprar, contratar, regularizar e crescer.</h2>
        </div>
        <div className="pillarGrid">
          {pillars.map((pillar) => (
            <article className="pillarCard" key={pillar.title}>
              <pillar.icon size={28} aria-hidden />
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section intro" id="diferencial">
        <div className="sectionHeading wide">
          <p className="kicker">Diferencial</p>
          <h2>O CNP conecta pessoas, mas vai além da troca de cartões.</h2>
          <p>
            A proposta é unir relacionamento empresarial com uma rede de
            especialistas e fornecedores capazes de atender demandas reais, com
            curadoria, organização por área e condições mais inteligentes para o
            associado.
          </p>
        </div>
        <div className="pillarGrid">
          {differentiators.map((item) => (
            <article className="pillarCard" key={item.title}>
              <item.icon size={28} aria-hidden />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="productBand" id="produto">
        <div className="productCopy">
          <p className="kicker">Produto</p>
          <h2>Uma plataforma para empresários encontrarem soluções sem perder tempo.</h2>
          <p>
            O associado entra no CNP para fazer relacionamento, divulgar sua
            empresa, acessar oportunidades, participar de eventos e encontrar
            apoio especializado sem depender de indicação solta, grupos
            desorganizados ou procura manual por fornecedores confiáveis.
          </p>
          <div className="featureList">
            <span><BadgeCheck size={18} aria-hidden /> assessorias e convênios</span>
            <span><Store size={18} aria-hidden /> marketplace e compras coletivas</span>
            <span><MessageSquareText size={18} aria-hidden /> oportunidades e especialistas</span>
            <span><Smartphone size={18} aria-hidden /> acesso pelo celular</span>
          </div>
        </div>
        <div className="productVisual">
          <Image
            src="/images/cnp-product-mobile.png"
            alt="Empresário usando a plataforma CNP no celular"
            width={900}
            height={600}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="floatingPanel top">
            <CircleDollarSign size={20} aria-hidden />
            <strong>Soluções em movimento</strong>
            <span>crédito, talentos, cursos, convênios e negócios em um só lugar</span>
          </div>
          <div className="floatingPanel bottom">
            <UsersRound size={20} aria-hidden />
            <strong>Rede com direção</strong>
            <span>relacionamento local com continuidade na Central do Associado</span>
          </div>
        </div>
      </section>
      <section className="section plans" id="participar">
        <div className="sectionHeading wide">
          <p className="kicker">Participação</p>
          <h2>Escolha o papel que melhor representa sua relação com o CNP.</h2>
          <p>
            O clube foi pensado para quem busca relacionamento empresarial com
            intenção clara: gerar oportunidade, oferecer solução e fortalecer a
            presença da própria marca na comunidade.
          </p>
        </div>
        <div className="planGrid">
          {participation.map((plan) => (
            <article className="planCard" key={plan.name}>
              <p>{plan.forWho}</p>
              <h3>{plan.name}</h3>
              <strong>Participar do CNP</strong>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      {/*
        SPEC-019:TASK-003 - as duas vitrines de pessoas, logo depois da
        participacao, como o cliente pediu.
        ENTRAM SEM NENHUMA PESSOA (INV-070). A instrucao do dono foi literal:
        "nao temos dados, vamos colocar so os espacos mesmo". A forma e a da
        imagem de referencia — seis espacos e depois tres; a identidade de quem
        vai ocupa-los e decisao seguinte, adiada de proposito em D-019-03.
        SEM LINK NO MENU, por D-019-02: o menu ficou como esta, e o teste de
        ancoras e unidirecional (exige id para cada href, nunca o contrario),
        entao secao com id e sem link passa.
      */}
      <VitrinePessoas {...VITRINES.formadores} />
      <VitrinePessoas {...VITRINES.diretoria} />
      <section className="ctaBand" id="contato">
        <div>
          <p className="kicker">Próximo passo</p>
          <h2>Entre para uma rede feita para gerar negócios reais.</h2>
          <p>
            Seja para vender, comprar, divulgar, contratar, buscar crédito,
            capacitar sua equipe ou resolver demandas, o CNP aproxima você de
            empresários e parceiros com interesse real em fazer negócio.
          </p>
        </div>
        {/*
          SPEC-016:TASK-003 - AC-006 / AC-007.
          ESTE ERA O UNICO DESTINO DE CADASTRO QUE SAIA DA PAGINA, e era um
          `mailto:`. O menu e o hero apenas rolavam ate aqui — por isso os tres
          caminhos terminavam em cliente de e-mail, e por isso os tres mudaram
          juntos. O `mailto:` do rodape fica: la ele e canal de contato, que e
          outra coisa.
        */}
        <a className="primaryBtn light" href={destinoCadastro}>
          Quero conhecer o projeto
          <CalendarDays size={20} aria-hidden />
        </a>
      </section>
      <footer className="footer">
        <div className="footerMain">
          <a className="footerBrand" href="#inicio" aria-label="Voltar ao início">
            <Image
              src="/images/cnp-logo-transparent.png"
              alt="CNP Clube de Negócios Paulista"
              width={260}
              height={174}
            />
          </a>
          <div className="footerPitch">
            <p className="kicker">Clube de Negócios Paulista</p>
            <h2>CNP Conecta empresários, oportunidades e soluções em um só ambiente.</h2>
            <p>
              Uma comunidade para empresários, fornecedores e especialistas que
              querem transformar relacionamento em resultado.
            </p>
          </div>
          <div className="footerContact">
            <a href="mailto:contato@cnp.app.br">
              <Mail size={18} aria-hidden />
              contato@cnp.app.br
            </a>
            <a href="#produto">
              <Smartphone size={18} aria-hidden />
              Central do Associado
            </a>
          </div>
        </div>
        <div className="footerBottom">
          <span>CNP - Clube de Negócios Paulista</span>
          <nav aria-label="Links do rodapé">
            <a href="#produto">Produto</a>
            <a href="#solucoes">Soluções</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#participar">Participar</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
