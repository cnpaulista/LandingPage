/**
 * SPEC-016:TASK-001 / TEST-001 e TEST-003.
 *
 * POR QUE O TEXTO E TESTADO CARACTERE A CARACTERE, e nao por "contem".
 *
 * A RISK-002 da spec e concreta: o texto do hero chegou ao projeto como
 * IMAGEM, nao como arquivo. Transcricao de imagem erra em acento, em virgula e
 * em palavra parecida — e um `toContain("associacao")` passaria por cima de
 * todos os tres. A comparacao exata e o unico formato que transforma esta
 * suite na conferencia que a AC-001 pede.
 *
 * Quem mudar a copy vai ver este teste quebrar. Isso e o efeito desejado: copy
 * institucional aprovada pelo cliente nao deve mudar por descuido de refactor,
 * e sim por decisao registrada.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { heroCopy, urlCadastro } from "./heroContent";

const TEXTO_APROVADO = {
  eyebrow: "Conectando empresários, inovação e oportunidades.",
  titulo: "Uma associação comercial e industrial que fomenta e nivela o empresário local.",
  subtitulo:
    "Modernizada e sistematizada, com soluções para impulsionar os empresários da Zona Sul de São Paulo.",
  paragrafos: [
    "Reunimos networking, marketplace, compras coletivas, assessoria contábil e jurídica, apoio para alvarás e licenças, acesso a crédito, banco de vagas e talentos e conexão com investidores anjo.",
    "Unimos empresários para reduzir custos, ampliar oportunidades e melhorar a gestão dos negócios, fortalecendo quem empreende e o desenvolvimento econômico da nossa região.",
  ],
} as const;

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("copy do hero (AC-001)", () => {
  it("entrega as cinco pecas exatamente como o cliente aprovou", () => {
    expect(heroCopy.eyebrow).toBe(TEXTO_APROVADO.eyebrow);
    expect(heroCopy.titulo).toBe(TEXTO_APROVADO.titulo);
    expect(heroCopy.subtitulo).toBe(TEXTO_APROVADO.subtitulo);
    expect(heroCopy.paragrafos).toEqual([...TEXTO_APROVADO.paragrafos]);
  });

  it("mantem os dois paragrafos de apoio, na ordem", () => {
    expect(heroCopy.paragrafos).toHaveLength(2);
  });
});

describe("botoes do hero (AC-002)", () => {
  it("exibe os dois rotulos aprovados", () => {
    expect(heroCopy.ctaPrimario.rotulo).toBe("Quero conhecer o projeto");
    expect(heroCopy.ctaSecundario.rotulo).toBe("Ver como funciona");
  });

  it("o secundario leva a secao do projeto", () => {
    // Que `#projeto` existe na pagina e guardado por `ProjetoSection.test.tsx`.
    expect(heroCopy.ctaSecundario.href).toBe("#projeto");
  });
});

describe("destino de cadastro (AC-006, AC-007, AC-008, INV-040)", () => {
  it("sem a variavel de ambiente, cai no dominio de PRODUCAO", () => {
    // Degradar para localhost publicaria link quebrado; degradar para producao
    // publica o link certo. A ausencia de env e o caso comum, nao o excepcional.
    vi.stubEnv("NEXT_PUBLIC_CNP_APP_URL", "");
    expect(urlCadastro("landing")).toBe("https://app.cnp.app.br/cadastro?origem=landing");
  });

  it("com a variavel definida, usa o valor dela", () => {
    vi.stubEnv("NEXT_PUBLIC_CNP_APP_URL", "https://app.exemplo.test");
    expect(urlCadastro("landing")).toBe("https://app.exemplo.test/cadastro?origem=landing");
  });

  it("barra de sobra no fim da variavel nao vira barra dupla na URL", () => {
    vi.stubEnv("NEXT_PUBLIC_CNP_APP_URL", "https://app.exemplo.test/");
    expect(urlCadastro("landing")).toBe("https://app.exemplo.test/cadastro?origem=landing");
  });

  it("NUNCA devolve mailto, e sempre devolve https absoluto (INV-040)", () => {
    for (const valor of ["", "https://app.cnp.app.br", "https://app.exemplo.test/"]) {
      vi.stubEnv("NEXT_PUBLIC_CNP_APP_URL", valor);
      const url = urlCadastro("landing");
      expect(url.startsWith("https://")).toBe(true);
      expect(url).not.toContain("mailto:");
      expect(new URL(url).pathname).toBe("/cadastro");
    }
  });

  it("o CTA primario do hero usa o mesmo destino", () => {
    expect(heroCopy.ctaPrimario.href).toContain("/cadastro?origem=landing");
    expect(heroCopy.ctaPrimario.href.startsWith("https://")).toBe(true);
  });
});
