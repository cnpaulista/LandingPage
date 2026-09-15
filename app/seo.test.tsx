/**
 * SEO tecnico da landing: robots, sitemap, metadados, Schema.org e paginas de
 * servico.
 *
 * O que estes testes guardam e o que o Google le. Antes deste pacote,
 * `robots.txt` e `sitemap.xml` davam 404 em producao (medido em 2026-09-15), e
 * o titulo nao dizia nem o que o clube e nem onde fica.
 */
import { render, screen } from "@testing-library/react";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { metadata } from "./layout";
import robots from "./robots";
import sitemap from "./sitemap";
import { projetoCopy } from "./components/projetoContent";
import { solutionCards } from "./components/solucoesContent";
import ServicoPage, { generateMetadata, generateStaticParams } from "./servicos/[slug]/page";
import { servicos } from "./servicos/servicosContent";
import {
  CONTATO_COMERCIAL,
  EMPRESA,
  HOME_DESCRICAO,
  HOME_TITULO,
  OG_IMAGEM,
  SITE_URL,
  jsonLdOrganizacao,
  serializarJsonLd,
} from "./site";

const LIMITE_DESCRICAO = 160;

describe("robots.txt e sitemap.xml", () => {
  it("robots libera o site, fecha /api/ e aponta o sitemap absoluto", () => {
    const r = robots();
    const regra = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(regra.allow).toBe("/");
    expect(regra.disallow).toBe("/api/");
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("sitemap lista a home, as quatro paginas de servico e as legais, todas absolutas", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain(SITE_URL);
    for (const s of servicos) expect(urls).toContain(`${SITE_URL}/servicos/${s.slug}`);
    expect(urls).toContain(`${SITE_URL}/privacidade`);
    expect(urls).toContain(`${SITE_URL}/termos`);
    for (const url of urls) expect(url.startsWith(`${SITE_URL}`)).toBe(true);
    expect(urls.some((u) => u.includes("/api/"))).toBe(false);
  });
});

describe("metadados da home", () => {
  it("o titulo diz o que e e onde fica", () => {
    expect(metadata.title).toEqual({ default: HOME_TITULO, template: "%s | Clube de Negócios Paulista" });
    expect(HOME_TITULO).toMatch(/Associação Comercial/);
    expect(HOME_TITULO).toMatch(/Zona Sul/);
  });

  it("a descricao cabe no resultado de busca", () => {
    expect(HOME_DESCRICAO.length).toBeLessThanOrEqual(LIMITE_DESCRICAO);
  });

  it("a imagem de compartilhamento existe, e leve e tem o formato do cartao", () => {
    const arquivo = join(process.cwd(), "public", OG_IMAGEM.url);
    expect(existsSync(arquivo)).toBe(true);
    expect(statSync(arquivo).size).toBeLessThan(300 * 1024);
    expect([OG_IMAGEM.width, OG_IMAGEM.height]).toEqual([1200, 630]);
  });

  it("a home declara canonical e publica o Schema da organizacao", () => {
    const fonte = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");
    expect(fonte).toContain('alternates: { canonical: "/" }');
    expect(fonte).toContain("serializarJsonLd(jsonLdOrganizacao())");
    expect(fonte).toContain('href={`/servicos/${servico.slug}`}');
  });

  it("paginas legais nao herdam o canonical da home", () => {
    for (const pagina of ["privacidade", "termos"]) {
      const fonte = readFileSync(join(process.cwd(), "app", pagina, "page.tsx"), "utf8");
      expect(fonte).toContain(`canonical: "/${pagina}"`);
    }
  });
});

describe("rodape: empresa e contato", () => {
  it("o rodape usa o CNPJ e a fundacao da associacao informados pelo dono", () => {
    expect(EMPRESA).toEqual({ cnpj: "67.842.179/0001-03", fundacao: "18/05/1992" });
  });

  it("o CNPJ tem digitos verificadores validos", () => {
    const n = EMPRESA.cnpj.replace(/\D/g, "").split("").map(Number);
    const dv = (pesos: number[]) => {
      const resto = pesos.reduce((soma, peso, i) => soma + peso * n[i], 0) % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
    expect(n).toHaveLength(14);
    expect(dv([5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])).toBe(n[12]);
    expect(dv([6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])).toBe(n[13]);
  });

  it("os documentos legais NAO recebem o CNPJ da associacao", () => {
    // Pedido do dono: o CNPJ novo e so da landing. Termos e Privacidade seguem
    // com a THREE CAPITAL, operadora do app, que e o que o associado aceitou.
    for (const pagina of ["termos", "privacidade"]) {
      const fonte = readFileSync(join(process.cwd(), "app", pagina, "page.tsx"), "utf8");
      expect(fonte, pagina).not.toContain(EMPRESA.cnpj);
      expect(fonte, pagina).toContain("58.536.705/0001-08");
    }
  });

  it("o link de telefone disca o numero que aparece na tela", () => {
    const digitos = CONTATO_COMERCIAL.telefone.replace(/\D/g, "");
    expect(CONTATO_COMERCIAL.telefoneHref).toBe(`tel:+55${digitos}`);
  });

  it("home e paginas de servico mostram empresa, CNPJ e contato", () => {
    for (const arquivo of [["page.tsx"], ["servicos", "[slug]", "page.tsx"]]) {
      const fonte = readFileSync(join(process.cwd(), "app", ...arquivo), "utf8");
      for (const trecho of ["EMPRESA.cnpj", "EMPRESA.fundacao", "CONTATO_COMERCIAL.telefoneHref", "CONTATO_COMERCIAL.nome"]) {
        expect(fonte, `${arquivo.join("/")}: ${trecho}`).toContain(trecho);
      }
    }
  });

  it("a pagina de servico renderiza CNPJ e telefone de verdade", async () => {
    const { container } = render(await ServicoPage({ params: Promise.resolve({ slug: servicos[0].slug }) }));
    const rodape = container.querySelector("footer")!;
    expect(rodape.textContent).toContain(`CNPJ nº ${EMPRESA.cnpj} | Fundada em ${EMPRESA.fundacao}`);
    expect(rodape.textContent).not.toContain("THREE CAPITAL");
    expect(rodape.querySelector(`a[href="${CONTATO_COMERCIAL.telefoneHref}"]`)?.textContent).toContain(
      CONTATO_COMERCIAL.telefone,
    );
  });
});

describe("Schema.org", () => {
  it("nao afirma endereco nem rede social que o clube nao publicou", () => {
    // O unico endereco no site e o da controladora dos dados, nao a sede do
    // clube; e nao existe perfil oficial em rede social no projeto.
    const texto = JSON.stringify(jsonLdOrganizacao());
    expect(texto).not.toContain("address");
    expect(texto).not.toContain("sameAs");
  });

  it("serializacao nao deixa texto fechar a tag script", () => {
    const saida = serializarJsonLd({ nome: "</script><script>alert(1)</script>" });
    expect(saida).not.toContain("<");
    expect(JSON.parse(saida).nome).toBe("</script><script>alert(1)</script>");
  });
});

describe("paginas de servico", () => {
  it("todo trecho aponta para bloco e paragrafo que existem no texto aprovado", () => {
    for (const s of servicos) {
      for (const trecho of s.projeto) {
        const bloco = projetoCopy.blocos.find((b) => b.icone === trecho.bloco);
        expect(bloco, `${s.slug}: bloco ${trecho.bloco}`).toBeTruthy();
        for (const i of trecho.paragrafos ?? []) {
          expect(bloco!.paragrafos[i], `${s.slug}: paragrafo ${i}`).toBeTruthy();
        }
      }
      for (const id of s.solucoes) {
        expect(solutionCards.some((c) => c.id === id), `${s.slug}: solucao ${id}`).toBe(true);
      }
    }
  });

  it("slugs, h1 e titulos sao unicos, e descricoes cabem no resultado", () => {
    for (const campo of ["slug", "h1", "metaTitulo", "metaDescricao"] as const) {
      expect(new Set(servicos.map((s) => s[campo])).size).toBe(servicos.length);
    }
    for (const s of servicos) {
      expect(s.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(s.metaDescricao.length, s.slug).toBeLessThanOrEqual(LIMITE_DESCRICAO);
    }
  });

  it("gera exatamente as paginas declaradas", () => {
    expect(generateStaticParams()).toEqual(servicos.map(({ slug }) => ({ slug })));
  });

  it.each(servicos.map((s) => [s.slug, s] as const))(
    "%s: canonical proprio, cartao completo e conteudo aprovado na tela",
    async (slug, servico) => {
      const params = Promise.resolve({ slug });
      const meta = await generateMetadata({ params });
      expect(meta.alternates?.canonical).toBe(`/servicos/${slug}`);
      expect((meta.openGraph as { images?: unknown[] }).images).toHaveLength(1);

      render(await ServicoPage({ params }));
      expect(screen.getByRole("heading", { level: 1, name: servico.h1 })).toBeTruthy();

      const trecho = servico.projeto[0];
      const bloco = projetoCopy.blocos.find((b) => b.icone === trecho.bloco)!;
      const primeiro = bloco.paragrafos[trecho.paragrafos?.[0] ?? 0];
      expect(screen.getByText(primeiro)).toBeTruthy();

      const cadastro = screen
        .getAllByRole("link")
        .map((a) => a.getAttribute("href") ?? "")
        .filter((href) => href.includes("/cadastro?"));
      expect(cadastro.length).toBeGreaterThan(0);
      for (const href of cadastro) expect(href).toContain(`origem=servico-${slug}`);
    },
  );
});
