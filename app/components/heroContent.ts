/**
 * SPEC-016:TASK-001 / MOD-050 / CON-050 - copy do hero e destino do cadastro.
 *
 * POR QUE ISTO E UM MODULO E NAO JSX SOLTO EM `page.tsx`.
 *
 * `page.tsx` e um componente `async` que faz `fetch` da API e le `headers()`.
 * Renderiza-lo em teste para conferir uma palavra do titulo exigiria simular
 * rede — e ai o teste prova o mock, nao a palavra. Com o texto aqui, a
 * asercao e direta e a AC-001 vira uma comparacao de igualdade.
 *
 * O SEGUNDO MOTIVO E A RISK-002: este texto chegou ao projeto como IMAGEM.
 * Com ele num arquivo so, a conferencia contra a referencia acontece em um
 * lugar, e nao espalhada por seis pontos de JSX.
 */

/**
 * Dominio do app do associado quando o ambiente nao diz outra coisa.
 *
 * O PADRAO E PRODUCAO, E ISSO E DELIBERADO (AC-008). Degradar para
 * `localhost` faria um host sem a variavel publicar um CTA quebrado para o
 * visitante — e "host sem a variavel" e o caso comum, porque a landing viveu
 * ate hoje sem nunca precisar saber o endereco do app.
 */
const APP_URL_PADRAO = "https://app.cnp.app.br";

/**
 * URL absoluta do cadastro, com a origem que a SPEC-015:AC-002 vai medir.
 *
 * `process.env.NEXT_PUBLIC_CNP_APP_URL` aparece escrito por extenso de
 * proposito: o Next substitui essa expressao literal no build, e desestruturar
 * ou montar o nome da variavel em runtime quebraria a substituicao — o valor
 * chegaria `undefined` no browser sem nenhum erro visivel.
 */
export function urlCadastro(origem: string, destino?: string): string {
  const base = process.env.NEXT_PUBLIC_CNP_APP_URL?.trim() || APP_URL_PADRAO;
  // A barra do fim e removida antes de concatenar: `.../` mais `/cadastro`
  // produziria `//cadastro`, que alguns hosts servem e outros devolvem 404.
  const url = `${base.replace(/\/+$/, "")}/cadastro?origem=${encodeURIComponent(origem)}`;
  /*
   * `destino` e um NOME que o app traduz (`Cliente/lib/destino.ts`):
   * `chamado:<codigo>`, `marketplace` ou `app`. O app guarda e, depois do
   * cadastro, leva a pessoa direto ao que ela escolheu aqui.
   */
  return destino ? `${url}&destino=${encodeURIComponent(destino)}` : url;
}

export interface HeroCta {
  rotulo: string;
  href: string;
}

export interface HeroCopy {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  paragrafos: string[];
  ctaPrimario: HeroCta;
  ctaSecundario: HeroCta;
}

/**
 * Texto aprovado pelo cliente em 2026-09-11. Nao reescrever sem decisao
 * registrada: `heroContent.test.ts` compara caractere a caractere e vai
 * quebrar, que e exatamente o que se espera dele.
 */
export const heroCopy: HeroCopy = {
  eyebrow: "Conectando empresários, inovação e oportunidades.",
  titulo: "Uma associação comercial e industrial que fomenta e nivela o empresário local.",
  subtitulo:
    "Modernizada e sistematizada, com soluções para impulsionar os empresários da Zona Sul de São Paulo.",
  paragrafos: [
    "Reunimos networking, marketplace, compras coletivas, assessoria contábil e jurídica, apoio para alvarás e licenças, acesso a crédito, banco de vagas e talentos e conexão com investidores anjo.",
    "Unimos empresários para reduzir custos, ampliar oportunidades e melhorar a gestão dos negócios, fortalecendo quem empreende e o desenvolvimento econômico da nossa região.",
  ],
  ctaPrimario: {
    rotulo: "Quero conhecer o projeto",
    href: urlCadastro("landing"),
  },
  ctaSecundario: {
    // `#produto` e nao `#modulos`: a secao "Como funciona" sai da pagina na
    // TASK-002, e CTA para secao removida e ancora morta.
    rotulo: "Conhecer o projeto",
    href: "#produto",
  },
};

/**
 * Os tres pontos da landing que levam ao cadastro (REQ-003 / AC-007).
 *
 * Uma constante so porque os tres tinham que apontar para o mesmo lugar e nao
 * apontavam: ate esta spec, o do menu ia para `#contato`, o do hero para
 * `#participar` e o da faixa final para `mailto:` — tres caminhos que
 * desaguavam no mesmo cliente de e-mail.
 */
export const destinoCadastro = urlCadastro("landing");
