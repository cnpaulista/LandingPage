/**
 * Secao "O projeto" - destino do botao secundario do hero.
 *
 * Texto enviado pelo cliente em 2026-09-15. Vive aqui, e nao em JSX, pelo
 * mesmo motivo de `heroContent.ts`: copy institucional aprovada fica num lugar
 * so, e `projetoContent.test.ts` compara caractere a caractere. Quem mudar uma
 * virgula aqui vai ver o teste quebrar, e isso e o efeito desejado.
 *
 * Os titulos estao em caixa mista de proposito. A caixa-alta do original e
 * apresentacao, e fica no CSS (`text-transform`), como no `h1` do hero: gravar
 * em maiusculas faria leitor de tela soletrar e buscador indexar grito.
 */

export interface ProjetoBloco {
  /** Chave estavel do icone, resolvida em `ProjetoSection.tsx`. */
  icone:
    | "negociacao"
    | "servicos"
    | "burocracia"
    | "parcerias"
    | "educacao"
    | "descontos"
    | "oportunidades"
    | "diretoria";
  /** Capa editorial local, sem texto ou marca de terceiros. */
  capa: string;
  titulo: string;
  paragrafos: string[];
}

export interface ProjetoCopy {
  kicker: string;
  abertura: { titulo: string; paragrafos: string[] };
  proposta: { titulo: string; paragrafos: string[] };
  blocos: ProjetoBloco[];
  exemplo: { titulo: string; paragrafos: string[] };
  fechamento: {
    titulo: string;
    paragrafos: string[];
    assinatura: string;
    cta: string;
  };
}

export const projetoCopy: ProjetoCopy = {
  kicker: "O projeto",
  abertura: {
    titulo: "Quem empreende sozinho paga mais caro para crescer",
    paragrafos: [
      "O fornecedor aumenta o preço. O banco cobra caro. A maquininha leva parte da margem. Encontrar profissionais de confiança dá trabalho, contratar gente preparada está difícil e a burocracia consome o tempo que você deveria dedicar à sua empresa.",
      "Você compra, vende, contrata, paga impostos, resolve problemas e ainda precisa encontrar força para crescer. Agora imagine contar com uma comunidade empresarial organizada para enfrentar esses desafios junto com você.",
      "É essa força que estamos construindo com o Clube de Negócios Paulista, a nossa associação comercial e industrial.",
    ],
  },
  proposta: {
    titulo: "Empresas independentes. Uma força coletiva.",
    paragrafos: [
      "Nossa proposta é unir empresários da Zona Sul, de M’Boi Mirim e adjacências para transformar necessidades em comum em melhores condições de compra, serviços qualificados, conhecimento e oportunidades de negócios.",
      "Cada empresa continua com sua identidade, sua gestão e suas decisões. A união amplia o acesso ao que, sozinho, muitas vezes custa mais caro ou parece distante.",
      "Quem já cresceu compartilha experiência. Quem está começando encontra orientação. E todos ajudam a construir uma economia local mais forte.",
    ],
  },
  blocos: [
    {
      icone: "negociacao",
      capa: "/images/projeto/capa-negociacao.webp",
      titulo: "Mais força com bancos, maquininhas e fornecedores",
      paragrafos: [
        "Uma empresa negociando apresenta seu próprio volume. Uma associação organizada pode reunir a demanda de muitos negócios e ampliar seu poder de negociação.",
        "Queremos usar essa força para buscar melhores taxas, prazos e condições com bancos, operadoras de cartão, fabricantes, distribuidores e prestadores de serviços, considerando o perfil de cada empresa.",
        "Compras coletivas, parcerias e oportunidades de importação fazem parte dessa proposta. Ao somar o que nossas empresas consomem, podemos abrir portas para condições que muitos pequenos e médios empresários dificilmente conseguiriam individualmente.",
        "Também queremos facilitar o acesso a ferramentas de consulta e proteção ao crédito, ajudando o empresário a avaliar riscos e tomar decisões mais seguras nas vendas.",
      ],
    },
    {
      icone: "servicos",
      capa: "/images/projeto/capa-servicos.webp",
      titulo: "Serviços qualificados e mais confiança para contratar",
      paragrafos: [
        "Todo empresário conhece o prejuízo de contratar alguém que promete muito e entrega pouco.",
        "Estamos estruturando uma rede de especialistas com avaliação de capacidade técnica, referências e histórico de atendimento. A proposta inclui acompanhar solicitações, prazos, entregas e avaliações de quem contratou, oferecendo mais critérios para escolher e reduzir o risco de prejuízos.",
        "Assessoria contábil e jurídica, crédito empresarial, marketing, tecnologia, recursos humanos, licenças e alvarás estarão entre as frentes dessa estrutura.",
        "Queremos aproximar o empresário de profissionais preparados e usar a demanda coletiva para buscar serviços de qualidade com preços competitivos.",
      ],
    },
    {
      icone: "burocracia",
      capa: "/images/projeto/capa-burocracia.webp",
      titulo: "Menos burocracia para abrir, regularizar e crescer",
      paragrafos: [
        "Nossa estrutura prevê apoio à abertura e legalização de empresas, serviços de Junta Comercial, emissão de certificado digital e orientação para registro de marcas e patentes.",
        "Queremos facilitar o acesso aos profissionais e procedimentos necessários para que o empresário organize sua documentação, proteja sua marca e mantenha seu negócio regularizado.",
        "O projeto também contempla buscar a implantação de um posto interno de atendimento da Receita Federal, mediante convênio e autorização, para aproximar o atendimento de quem empreende.",
      ],
    },
    {
      icone: "parcerias",
      capa: "/images/projeto/capa-parcerias.webp",
      titulo: "Parcerias que ampliam nossa capacidade de entrega",
      paragrafos: [
        "Queremos construir parcerias com o Sebrae, a OAB e a Junta Comercial para aproximar os associados de orientação empresarial, educação jurídica, capacitação e serviços de registro.",
        "Essas parcerias fazem parte da estrutura que pretendemos consolidar para levar conhecimento e apoio prático à rotina das empresas.",
      ],
    },
    {
      icone: "educacao",
      capa: "/images/projeto/capa-educacao.webp",
      titulo: "Gente preparada para fazer sua empresa crescer",
      paragrafos: [
        "Uma empresa melhora quando quem está à frente e quem está na operação têm acesso ao conhecimento.",
        "Por isso, nosso projeto inclui um canal de educação para empresários e funcionários, com cursos, palestras, oficinas e treinamentos voltados aos desafios reais do negócio: atendimento, vendas, gestão, finanças, tecnologia e preparação para o trabalho.",
        "Também estamos construindo um banco de vagas e talentos com profissionais indicados por empresários e outros profissionais, com referências verificadas e informações sobre suas qualificações.",
        "A indicação abre a porta. A avaliação ajuda a dar mais segurança à contratação. E a capacitação prepara as pessoas para entregar um trabalho melhor.",
      ],
    },
    {
      icone: "descontos",
      capa: "/images/projeto/capa-descontos.webp",
      titulo: "Clube de Descontos e benefícios para quem participa",
      paragrafos: [
        "Queremos reunir condições especiais em produtos, serviços e benefícios para empresários e suas equipes.",
        "O Clube de Descontos será voltado à negociação de vantagens com empresas parceiras, incluindo oportunidades em saúde, odontologia, educação, bem-estar e serviços para o negócio.",
        "A proposta é fazer a participação na associação gerar valor também nas despesas do dia a dia.",
      ],
    },
    {
      icone: "oportunidades",
      capa: "/images/projeto/capa-oportunidades.webp",
      titulo: "Clube de Oportunidades e conexões que geram negócios",
      paragrafos: [
        "O cliente que você procura pode estar dentro da comunidade. O fornecedor de que precisa também. E uma solução que parece difícil pode já fazer parte da experiência de outro empresário.",
        "Nosso Clube de Oportunidades pretende reunir demandas de compra, ofertas de serviços, parcerias comerciais e conexões com investidores.",
        "Jantares empresariais, encontros e o marketplace serão caminhos para apresentar sua empresa, construir confiança e abrir portas.",
        "Também está prevista a locação de espaços para reuniões, cursos, treinamentos e eventos, ampliando o acesso a ambientes adequados para receber clientes, desenvolver equipes e fazer negócios.",
      ],
    },
    {
      icone: "diretoria",
      capa: "/images/projeto/capa-diretoria.webp",
      titulo: "Uma diretoria forte para dar voz a quem empreende",
      paragrafos: [
        "O empresário precisa ser ouvido e ter suas demandas acompanhadas.",
        "Nossa proposta inclui uma diretoria forte, influente e atuante, capaz de dialogar com o poder público, apresentar os desafios da região e cobrar respostas com organização, dados e prioridades.",
        "O número de empresas participantes, os empregos que geram e as dificuldades que compartilham dão consistência a essa representação.",
        "Queremos transformar essas informações em propostas para reduzir burocracias e buscar melhorias em infraestrutura, iluminação, segurança e condições para trabalhar e investir.",
      ],
    },
  ],
  exemplo: {
    titulo: "Mais conhecimento para vender. Mais escala para comprar.",
    paragrafos: [
      "Imagine uma pizzaria que vende de 500 a 1.000 pizzas por dia e outra que vende 100. A experiência de quem já opera em maior volume pode ajudar a outra a melhorar a produção, o atendimento, a qualidade e as vendas.",
      "Depois, essas pizzarias podem reunir sua demanda de farinha, queijo, proteínas e embalagens para negociar com fornecedores.",
      "Elas continuam independentes, mas encontram oportunidades de cooperação que beneficiam ambas. Essa lógica pode fortalecer o comércio, a indústria e os serviços, levando mais qualidade também a quem consome.",
    ],
  },
  fechamento: {
    titulo: "Sua empresa pode fazer parte dessa transformação",
    paragrafos: [
      "O Clube de Negócios Paulista está sendo estruturado para conectar empresários, qualificar serviços, desenvolver pessoas e transformar a união em benefícios concretos.",
      "Queremos uma comunidade em que o conhecimento circule, os profissionais sejam valorizados, as empresas comprem melhor e as oportunidades movimentem a economia da nossa região.",
      "Quanto mais empresários participarem, maior será nossa capacidade de negociar, representar e construir soluções.",
      "Você já faz muita coisa pela sua empresa. Agora imagine o que podemos construir juntos.",
    ],
    assinatura: "Clube de Negócios Paulista. Conectar. Gerar. Fortalecer.",
    cta: "Quero fazer parte",
  },
};
