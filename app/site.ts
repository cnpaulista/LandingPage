/**
 * Identidade do site para buscador: endereco canonico, nome, descricao e os
 * dados estruturados (Schema.org). Um lugar so, porque `layout.tsx`,
 * `sitemap.ts`, `robots.ts`, a home e as paginas de servico precisam dizer a
 * MESMA coisa — nome escrito de dois jeitos vira duas entidades para o Google.
 *
 * O QUE FICA DE FORA DE PROPOSITO:
 * - Endereco postal. O unico publicado no site e o da THREE CAPITAL LTDA, a
 *   controladora dos dados (`privacidade/page.tsx`), e nao a sede do clube.
 *   Declarar ali como endereco da organizacao seria afirmar o que nao sabemos.
 * - `sameAs` (redes sociais). Nenhum perfil oficial existe no projeto hoje.
 */
export const SITE_URL = "https://cnp.app.br";
export const SITE_NOME = "Clube de Negócios Paulista";

export const HOME_TITULO = "CNP | Associação Comercial da Zona Sul de SP";
export const HOME_DESCRICAO =
  "Associação comercial e industrial da Zona Sul de São Paulo e M’Boi Mirim: compras coletivas, crédito, assessoria contábil e jurídica, talentos e networking.";

/**
 * CNPJ e fundacao do clube, e contato comercial, exibidos no rodape do site.
 *
 * SAO DUAS PESSOAS JURIDICAS, E NAO UM ERRO DE COPIA. Este CNPJ e o da
 * associacao, informado pelo dono em 2026-09-15 para aparecer SO na landing.
 * Os Termos de Uso e o Aviso de Privacidade continuam com a THREE CAPITAL LTDA
 * (58.536.705/0001-08), que e a operadora do app CNP Conecta e a controladora
 * dos dados — e o texto que o associado aceitou. Nao propagar este CNPJ para
 * aqueles documentos: la, trocar a empresa e mudanca juridica, com versao nova.
 */
export const EMPRESA = {
  cnpj: "67.842.179/0001-03",
  fundacao: "18/05/1992",
};

export const CONTATO_COMERCIAL = {
  nome: "Luciano Macedo",
  telefone: "(11) 94763-9184",
  /** E.164, para o `tel:` discar certo de qualquer DDD ou de fora do Brasil. */
  telefoneHref: "tel:+5511947639184",
};

export const OG_IMAGEM = {
  url: "/images/cnp-og.jpg",
  width: 1200,
  height: 630,
  alt: "Clube de Negócios Paulista - associação comercial e industrial da Zona Sul de São Paulo",
};

export const AREA_ATENDIDA = ["Zona Sul de São Paulo", "M’Boi Mirim", "São Paulo"];

const organizacaoId = `${SITE_URL}/#organizacao`;

export function jsonLdOrganizacao() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizacaoId,
        name: SITE_NOME,
        alternateName: "CNP",
        url: SITE_URL,
        logo: `${SITE_URL}/images/cnp-logo-oficial.jpeg`,
        description: HOME_DESCRICAO,
        email: "contato@cnp.app.br",
        slogan: "Conectar. Gerar. Fortalecer.",
        areaServed: AREA_ATENDIDA.map((name) => ({ "@type": "Place", name })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name: SITE_NOME,
        alternateName: "CNP",
        inLanguage: "pt-BR",
        publisher: { "@id": organizacaoId },
      },
    ],
  };
}

export function jsonLdServico(args: { nome: string; descricao: string; caminho: string }) {
  const url = `${SITE_URL}${args.caminho}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: args.nome,
        description: args.descricao,
        url,
        provider: { "@type": "Organization", "@id": organizacaoId, name: SITE_NOME, url: SITE_URL },
        areaServed: AREA_ATENDIDA.map((name) => ({ "@type": "Place", name })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NOME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: args.nome, item: url },
        ],
      },
    ],
  };
}

/**
 * Serializa JSON-LD para `<script type="application/ld+json">`.
 *
 * `<` vira `<` porque o conteudo vai cru para dentro de uma tag script: um
 * texto com `</script>` fecharia a tag e o resto viraria HTML. Hoje todo texto
 * e nosso, mas a descricao e copy editavel, e a guarda custa uma linha.
 */
export function serializarJsonLd(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, "\\u003c");
}
