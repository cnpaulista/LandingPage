import {
  ClipboardList,
  FileSpreadsheet,
  Gift,
  GraduationCap,
  HandCoins,
  Landmark,
  Scale,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Dados das solucoes da landing: o card da secao, o modal e as paginas de
 * `/servicos`. Fora de `SolutionsSection.tsx` porque aquele arquivo e
 * `"use client"`, e componente de servidor que importa de modulo client recebe
 * referencia de cliente, nao o array.
 */

export type Solution = {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  products: string[];
};

export const solutionCards: Solution[] = [
  {
    id: "contabil",
    icon: FileSpreadsheet,
    title: "Assessoria contábil",
    text: "Apoio para abrir, regularizar e organizar a rotina fiscal da empresa.",
    products: [
      "Abrir empresa",
      "Consultoria tributária",
      "Regularização fiscal",
      "Folha de pagamento",
      "Remoção de sócio",
      "Atualização de capital",
    ],
  },
  {
    id: "juridica",
    icon: Scale,
    title: "Assessoria jurídica",
    text: "Orientação para prevenir riscos, formalizar acordos e proteger decisões empresariais.",
    products: [
      "Contratos empresariais",
      "Direito societário",
      "Direito trabalhista",
      "Cobranças e acordos",
      "Defesa preventiva",
      "Mediação de conflitos",
    ],
  },
  {
    id: "credito",
    icon: Landmark,
    title: "Crédito Bancário",
    text: "Caminhos para preparar a empresa, comparar linhas e buscar capital com mais clareza.",
    products: [
      "Capital de giro",
      "Antecipação de recebíveis",
      "Financiamento PJ",
      "Renegociação bancária",
      "Linhas de crédito",
      "Preparação de documentos",
    ],
  },
  {
    id: "alvaras",
    icon: ClipboardList,
    title: "Alvarás e Licenças",
    text: "Suporte para manter a operação regular diante de exigências municipais e setoriais.",
    products: [
      "Alvará de funcionamento",
      "Vigilância Sanitária",
      "Regularização municipal",
      "AVCB",
      "Inscrições e cadastros",
      "Renovação de licenças",
    ],
  },
  {
    id: "talentos",
    icon: Users,
    title: "Banco de talentos",
    text: "Conexões para encontrar profissionais, parceiros e prestadores alinhados ao negócio.",
    products: [
      "Divulgação de vagas",
      "Banco de currículos",
      "Triagem inicial",
      "Indicações qualificadas",
      "Freelancers e parceiros",
      "Apoio de RH",
    ],
  },
  {
    id: "educacao",
    icon: GraduationCap,
    title: "Educação para empresários",
    text: "Conteúdos práticos para desenvolver gestão, vendas, finanças e liderança.",
    products: [
      "Gestão empresarial",
      "Finanças para negócios",
      "Vendas e atendimento",
      "Liderança",
      "Marketing digital",
      "Trilhas práticas",
    ],
  },
  {
    id: "investidor",
    icon: HandCoins,
    title: "Investidor Anjo",
    text: "Preparação e conexão para empresas que buscam capital inteligente e mentoria.",
    products: [
      "Preparação para pitch",
      "Conexão com investidores",
      "Valuation inicial",
      "Plano de crescimento",
      "Mentoria estratégica",
      "Rodadas de apresentação",
    ],
  },
  {
    id: "marketplace",
    icon: ShoppingCart,
    title: "Marketplace",
    text: "Vitrine B2B para apresentar ofertas, comprar e vender dentro da comunidade.",
    products: [
      "Produtos e serviços",
      "Vitrine B2B",
      "Ofertas da comunidade",
      "Compras coletivas",
      "Contato por WhatsApp",
      "Fornecedores validados",
    ],
  },
  {
    id: "beneficios",
    icon: Gift,
    title: "Benefícios",
    text: "Vantagens, convênios e condições especiais negociadas para quem faz parte do clube.",
    products: [
      "Convênios e descontos",
      "Clube de vantagens",
      "Condições especiais",
      "Parcerias comerciais",
      "Ofertas para associados",
      "Vantagens em serviços",
    ],
  },
];

/*
 * PARA ONDE CADA SOLUCAO LEVA, DEPOIS DO CADASTRO.
 *
 * `chamado:<codigo>` abre a abertura de chamado com o segmento ja escolhido. O
 * codigo e o de `specialties.code` em PRODUCAO, e NAO o nome: os nomes foram
 * editados no Admin e ja nao batem com os codigos (`seguros` hoje se chama
 * "Recursos Humanos", `015` e "Credito Bancario"). O codigo nao muda; o nome
 * muda. Medido em 14/09/2026.
 *
 * Solucao sem segmento correspondente claro vai para o app (`app`). Segmento
 * que ainda nao tem especialista nao some daqui — a landing e estatica —, mas
 * o app avisa e oferece os que tem.
 */
export const CONTRATAR = "Contrate um especialista";
export const destinoDaSolucao: Record<string, { destino: string; cta: string }> = {
  contabil: { destino: "chamado:contabil", cta: CONTRATAR },
  juridica: { destino: "chamado:juridico", cta: CONTRATAR },
  credito: { destino: "chamado:015", cta: CONTRATAR },
  alvaras: { destino: "chamado:sanitario", cta: CONTRATAR },
  // "Recursos Humanos" e o segmento mais proximo de recrutamento.
  talentos: { destino: "chamado:seguros", cta: CONTRATAR },
  marketplace: { destino: "marketplace", cta: "Acessar o marketplace" },
};
export const SEM_DESTINO_CLARO = { destino: "app", cta: "Quero conhecer o projeto" };
