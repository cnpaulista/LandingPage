/**
 * Paginas de servico (`/servicos/<slug>`) - uma pagina por assunto de busca.
 *
 * A landing e uma pagina so, e uma pagina so disputa um assunto so. Estas
 * paginas existem para o Google ter o que mostrar para "abertura de empresa",
 * "credito empresarial", "compras coletivas" e "banco de talentos" na regiao.
 *
 * O CORPO NAO TEM TEXTO NOVO. Cada pagina monta paragrafos ja aprovados: os
 * blocos da secao "O projeto" (`projetoContent.ts`, texto do cliente de
 * 2026-09-15) e os cards de Solucoes (`solucoesContent.ts`). O que e escrito
 * aqui e so o que o buscador le antes de entrar: `h1`, `metaTitulo` e
 * `metaDescricao`. Isso e rascunho para o cliente aprovar, e por isso fica
 * junto, num lugar so.
 *
 * O tom segue o do projeto: o que ainda esta sendo estruturado e descrito como
 * proposta, nunca como servico ja entregue.
 */
import type { ProjetoBloco } from "../components/projetoContent";

export interface TrechoDoProjeto {
  bloco: ProjetoBloco["icone"];
  /** Indices dos paragrafos do bloco. Ausente = todos. */
  paragrafos?: number[];
}

export interface Servico {
  slug: string;
  /** Nome curto: trilha de navegacao, links do rodape e Schema. */
  nome: string;
  h1: string;
  metaTitulo: string;
  metaDescricao: string;
  /** Trechos da secao "O projeto", na ordem em que aparecem na pagina. */
  projeto: TrechoDoProjeto[];
  /** Inclui o exemplo das pizzarias. */
  exemplo?: boolean;
  /** Ids de `solutionCards`. O primeiro da o texto de abertura e o CTA. */
  solucoes: string[];
}

export const servicos: Servico[] = [
  {
    slug: "abertura-de-empresa",
    nome: "Abertura de empresa",
    h1: "Abertura e regularização de empresas na Zona Sul de São Paulo",
    metaTitulo: "Abertura e regularização de empresas na Zona Sul de SP",
    metaDescricao:
      "Abertura e regularização de empresas na Zona Sul de São Paulo e M’Boi Mirim: assessoria contábil, Junta Comercial, alvarás, licenças e certificado digital.",
    projeto: [{ bloco: "burocracia" }],
    solucoes: ["contabil", "alvaras", "juridica"],
  },
  {
    slug: "credito-empresarial",
    nome: "Crédito empresarial",
    h1: "Crédito empresarial para empresas da Zona Sul de São Paulo",
    metaTitulo: "Crédito empresarial para empresas da Zona Sul de SP",
    metaDescricao:
      "Prepare sua empresa, compare linhas e busque melhores taxas e prazos com a força de uma associação comercial da Zona Sul de São Paulo e M’Boi Mirim.",
    projeto: [{ bloco: "negociacao", paragrafos: [0, 1, 3] }],
    solucoes: ["credito", "investidor"],
  },
  {
    slug: "compras-coletivas",
    nome: "Compras coletivas",
    h1: "Compras coletivas para empresas da Zona Sul de São Paulo",
    metaTitulo: "Compras coletivas para empresas da Zona Sul de SP",
    metaDescricao:
      "Como empresas independentes da Zona Sul de São Paulo podem reunir demanda para negociar com fornecedores: compras coletivas, marketplace B2B e benefícios.",
    projeto: [{ bloco: "negociacao", paragrafos: [0, 2] }],
    exemplo: true,
    solucoes: ["marketplace", "beneficios"],
  },
  {
    slug: "banco-de-talentos",
    nome: "Banco de talentos",
    h1: "Banco de vagas, talentos e capacitação na Zona Sul de São Paulo",
    metaTitulo: "Banco de talentos e capacitação na Zona Sul de SP",
    metaDescricao:
      "Banco de vagas e talentos com indicações de empresários e capacitação para empresários e equipes. Uma frente do Clube de Negócios Paulista na Zona Sul de SP.",
    projeto: [{ bloco: "educacao" }],
    solucoes: ["talentos", "educacao"],
  },
];

export function servicoPorSlug(slug: string): Servico | undefined {
  return servicos.find((s) => s.slug === slug);
}
