import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Megaphone,
  MessageSquareText,
  Newspaper,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  UsersRound,
} from "lucide-react";

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

const solutionCards = [
  {
    icon: Building2,
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
    icon: ShieldCheck,
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
    icon: CircleDollarSign,
    title: "Crédito bancário",
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
    icon: BadgeCheck,
    title: "Licenças e alvarás",
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
    icon: UsersRound,
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
    icon: Store,
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
    icon: GraduationCap,
    title: "Cursos para empresários",
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
    icon: Megaphone,
    title: "Marketing",
    text: "Apoio para posicionar a marca, atrair clientes e divulgar melhor a empresa.",
    products: [
      "Diagnóstico de marca",
      "Gestão de tráfego",
      "Social media",
      "Identidade visual",
      "Campanhas locais",
      "Estratégia comercial",
    ],
  },
  {
    icon: Handshake,
    title: "Investidor anjo",
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
    icon: CalendarDays,
    title: "Eventos e jantares",
    text: "Encontros presenciais para relacionamento, reputação e oportunidades entre empresários.",
    products: [
      "Networking presencial",
      "Rodadas de negócios",
      "Jantares empresariais",
      "Palestras",
      "Encontros setoriais",
      "Agenda da comunidade",
    ],
  },
];

const newsItems = [
  {
    tag: "Eventos",
    title: "Agenda de encontros empresariais",
    text: "Um espaço para destacar jantares, palestras, rodadas de negócios e ações presenciais da comunidade CNP.",
  },
  {
    tag: "Gestão",
    title: "Conteúdos úteis para empresários",
    text: "Notícias e orientações sobre crédito, regularização, marketing, talentos e decisões que impactam o dia a dia da empresa.",
  },
  {
    tag: "Comunidade",
    title: "Novidades dos associados",
    text: "Divulgação de conquistas, parcerias, oportunidades e histórias de empresas que movimentam a rede.",
  },
];

const modules = [
  {
    icon: ShieldCheck,
    title: "Demandas direcionadas",
    text: "O empresário escolhe a área da necessidade e encontra caminhos de atendimento, conteúdo ou parceiros.",
  },
  {
    icon: Store,
    title: "Ofertas dentro da rede",
    text: "Produtos e serviços ganham visibilidade para uma comunidade com intenção real de comprar, vender e indicar.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Relacionamento com continuidade",
    text: "Eventos, jantares e oportunidades presenciais seguem vivos no digital pela Central do Associado.",
  },
];

const visualStories = [
  {
    image: "/images/cnp-specialists-service.png",
    alt: "Empresário e especialista analisando uma demanda empresarial na plataforma CNP",
    eyebrow: "Especialistas",
    title: "Ajuda prática para problemas do negócio.",
    text: "Quando surge uma demanda jurídica, contábil, financeira ou de marketing, o associado encontra um caminho mais direto para falar com quem pode ajudar.",
  },
  {
    image: "/images/cnp-marketplace-event.png",
    alt: "Empresários negociando produtos e serviços em um evento do CNP",
    eyebrow: "Marketplace",
    title: "Oportunidades que nascem no relacionamento.",
    text: "A conversa começa no evento, continua no digital e vira vitrine, pedido, indicação, orçamento ou parceria entre membros da rede.",
  },
];

const community = [
  {
    step: "Associados",
    title: "Empresários que querem crescer com relacionamento",
    text: "Participam da comunidade, encontram fornecedores, divulgam seu negócio, acompanham eventos e acessam especialistas.",
    tag: "rede de negócios",
  },
  {
    step: "Fornecedores",
    title: "Empresas que querem vender para uma rede qualificada",
    text: "Apresentam produtos e serviços em uma vitrine B2B, recebem contatos e participam de oportunidades geradas pelo clube.",
    tag: "vitrine B2B",
  },
  {
    step: "Especialistas",
    title: "Profissionais que resolvem demandas empresariais",
    text: "Atendem necessidades reais dos associados e fortalecem autoridade junto a uma comunidade de empresários.",
    tag: "soluções práticas",
  },
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

export default function Home() {
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
          <a className="navCta" href="#contato">
            <span>Fazer parte</span>
            <ArrowRight size={18} aria-hidden />
          </a>
        </header>

        <div className="heroContent">
          <p className="eyebrow">
            <Sparkles size={18} aria-hidden />
            Clube de Negócios Paulista
          </p>
          <h1>Um hub de networking entre empresários para conectar, apresentar soluções e melhorar seus resultados.</h1>
          <p className="heroLead">
            O CNP reúne networking, marketplace, assessorias, crédito, talentos,
            cursos, marketing, investidores, eventos e notícias em uma plataforma
            feita para empresas que querem avançar com relacionamento e direção.
          </p>
          <div className="heroActions">
            <a className="primaryBtn" href="#participar">
              Quero fazer parte
              <ArrowRight size={20} aria-hidden />
            </a>
            <a className="secondaryBtn" href="#beneficios">
              Conhecer benefícios
            </a>
          </div>
          <div className="heroStats" aria-label="Pilares da experiência CNP">
            <div>
              <strong>Networking</strong>
              <span>empresários conectados por encontros, interesses e oportunidades</span>
            </div>
            <div>
              <strong>Soluções</strong>
              <span>serviços organizados por necessidade do negócio</span>
            </div>
            <div>
              <strong>Resultados</strong>
              <span>mais clareza para vender, regularizar, contratar e crescer</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section solutions" id="solucoes">
        <div className="sectionHeading wide">
          <p className="kicker">Soluções para empresários</p>
          <h2>As principais necessidades do negócio em cards simples de acessar.</h2>
          <p>
            Cada área organiza subprodutos que podem virar atendimento, conteúdo,
            indicação, parceiro validado ou oportunidade dentro da comunidade.
          </p>
        </div>
        <div className="solutionGrid">
          {solutionCards.map((item) => (
            <article className="solutionCard" key={item.title}>
              <item.icon size={26} aria-hidden />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ul className="solutionList">
                {item.products.map((product) => (
                  <li key={product}>{product}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="newsBand" id="noticias">
        <div className="newsHeading">
          <p className="kicker">Notícias</p>
          <h2>Informação para manter o empresário perto do que movimenta a rede.</h2>
        </div>
        <div className="newsGrid">
          {newsItems.map((item) => (
            <article className="newsCard" key={item.title}>
              <span>{item.tag}</span>
              <Newspaper size={28} aria-hidden />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
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

      <section className="section" id="modulos">
        <div className="sectionHeading wide">
          <p className="kicker">Como funciona</p>
          <h2>Como o associado transforma a rede em movimento para a empresa.</h2>
        </div>
        <div className="moduleGrid">
          {modules.map((item, index) => (
            <article className="moduleCard" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <item.icon size={28} aria-hidden />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="visualStories" aria-label="Cenas da experiência CNP">
        {visualStories.map((story) => (
          <article className="storyCard" key={story.title}>
            <Image
              src={story.image}
              alt={story.alt}
              width={900}
              height={506}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div>
              <p className="kicker">{story.eyebrow}</p>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="proofBand">
        <div className="proofCopy">
          <p className="kicker">Vida real</p>
          <h2>Relacionamento, presença local e soluções práticas para empresários.</h2>
          <p>
            O CNP nasce para apoiar quem empreende de verdade: gente que precisa
            vender, contratar, divulgar, buscar crédito, resolver pendências,
            encontrar parceiros, capacitar equipes e estar perto de outros
            empresários que também fazem acontecer.
          </p>
        </div>
        <div className="proofGrid">
          <div><UsersRound size={24} aria-hidden /><strong>Empresários e lideranças</strong><span>uma rede para trocar experiência, reputação e oportunidade</span></div>
          <div><MapPin size={24} aria-hidden /><strong>Atuação regional</strong><span>conexões com foco em negócios locais e relações de confiança</span></div>
          <div><Building2 size={24} aria-hidden /><strong>Fornecedores aprovados</strong><span>vitrine B2B para quem quer vender para empresas</span></div>
          <div><BriefcaseBusiness size={24} aria-hidden /><strong>Hub de soluções</strong><span>apoio para demandas que travam o crescimento do negócio</span></div>
        </div>
      </section>

      <section className="section" id="comunidade">
        <div className="sectionHeading">
          <p className="kicker">Comunidade</p>
          <h2>Três formas de participar de uma rede que gera valor.</h2>
        </div>
        <div className="timeline">
          {community.map((item) => (
            <article className="timelineItem" key={item.step}>
              <span className="tag">{item.tag}</span>
              <p>{item.step}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
            </article>
          ))}
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
        <a className="primaryBtn light" href="mailto:contato@cnp.app.br?subject=Quero%20fazer%20parte%20do%20CNP">
          Quero fazer parte
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
