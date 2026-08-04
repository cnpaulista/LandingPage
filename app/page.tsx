import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  GraduationCap,
  Handshake,
  Layers3,
  Mail,
  MapPin,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  UsersRound,
} from "lucide-react";

const pillars = [
  {
    icon: Handshake,
    title: "Conectar empresários",
    text: "Uma rede curada para aproximar empresários, fornecedores, especialistas e formadores de opinião.",
  },
  {
    icon: CircleDollarSign,
    title: "Gerar oportunidades",
    text: "Marketplace, indicações, eventos e demandas qualificadas para transformar relacionamento em negócio real.",
  },
  {
    icon: ShieldCheck,
    title: "Fortalecer a gestão",
    text: "Chamados por área, especialistas aprovados e acompanhamento com clareza de diagnóstico, prazo e valor.",
  },
];

const modules = [
  ["Central de chamados", "Jurídico, contábil, sanitário, financeiro e marketing em uma esteira simples."],
  ["Marketplace B2B", "Anúncios com fotos, preços, vitrine por categoria e contato direto via WhatsApp."],
  ["Planos e acessos", "Três planos gratuitos no MVP, com módulos liberados pelo painel administrativo."],
  ["Eventos e benefícios", "Agenda, confirmação de presença, convênios e vantagens para criar recorrência."],
  ["Universidade CNP", "Cursos, mentorias, vídeos e conteúdos externos para desenvolver negócios e equipes."],
  ["Métricas por bairro", "Volume de negócios, atividade por região e demanda por módulo para orientar evolução."],
];

const visualStories = [
  {
    image: "/images/cnp-specialists-service.png",
    alt: "Empresário e especialista analisando chamados na plataforma CNP",
    eyebrow: "Especialistas",
    title: "Resolver demandas com orientação clara.",
    text: "Chamados por categoria conectam o empresário a especialistas aprovados, com diagnóstico, prazo e valor estimado.",
  },
  {
    image: "/images/cnp-marketplace-event.png",
    alt: "Empresários negociando produtos e serviços em evento CNP",
    eyebrow: "Marketplace",
    title: "Transformar encontros em oportunidades.",
    text: "A rede presencial ganha continuidade digital com vitrine B2B, contatos diretos e oportunidades por comunidade.",
  },
];

const roadmap = [
  {
    step: "Entrega 1",
    title: "MVP demonstrável",
    text: "Cadastro, login, planos gratuitos, perfil de negócio, chamados, marketplace, notificações e admin.",
    tag: "20-50 empresários",
  },
  {
    step: "Entrega 2",
    title: "Engajamento diário",
    text: "Eventos, benefícios, universidade, banco de talentos, indicações, notícias, chat e dashboard.",
    tag: "hábito e retenção",
  },
  {
    step: "Entrega 3",
    title: "PWA e escala",
    text: "Instalável no celular, Web Push, login Apple, relatórios avançados e base pronta para monetização futura.",
    tag: "mobile sem loja",
  },
];

const plans = [
  {
    name: "Conexão",
    forWho: "Para entrar na rede",
    features: ["Perfil de negócio", "Marketplace aberto", "Eventos públicos", "Conteúdos essenciais"],
  },
  {
    name: "Crescimento",
    forWho: "Para vender e resolver",
    features: ["Chamados por categoria", "Anúncios completos", "Benefícios e convênios", "Indicações registradas"],
  },
  {
    name: "Impacto",
    forWho: "Para liderar a comunidade",
    features: ["Destaques no ecossistema", "Métricas de demanda", "Eventos exclusivos", "Acesso prioritário"],
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="inicio">
        <Image
          className="heroImage"
          src="/images/cnp-hero-networking.png"
          alt="Empresários em um jantar de negócios CNP"
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
            <a href="#produto">Produto</a>
            <a href="#modulos">Módulos</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#planos">Planos</a>
          </nav>
          <a className="navCta" href="#contato">
            <span>Demonstração</span>
            <ArrowRight size={18} aria-hidden />
          </a>
        </header>

        <div className="heroContent">
          <p className="eyebrow">
            <Sparkles size={18} aria-hidden />
            Clube de negócios, plataforma digital e comunidade ativa
          </p>
          <h1>Onde networking vira negócio em poucos cliques.</h1>
          <p className="heroLead">
            O CNP conecta empresários, especialistas e fornecedores em um hub
            mobile-first para resolver demandas, vender, comprar, participar de
            eventos e medir o crescimento da rede.
          </p>
          <div className="heroActions">
            <a className="primaryBtn" href="#produto">
              Ver a plataforma
              <ArrowRight size={20} aria-hidden />
            </a>
            <a className="secondaryBtn" href="#roadmap">
              Explorar entregas
            </a>
          </div>
          <div className="heroStats" aria-label="Metas iniciais do MVP">
            <div>
              <strong>20-50</strong>
              <span>empresários no piloto</span>
            </div>
            <div>
              <strong>3</strong>
              <span>planos gratuitos no MVP</span>
            </div>
            <div>
              <strong>R$ 28</strong>
              <span>infra estimada no inicio</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="sectionHeading">
          <p className="kicker">Conectar. Gerar. Fortalecer.</p>
          <h2>Uma rede empresarial com produto, método e tração offline.</h2>
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

      <section className="productBand" id="produto">
        <div className="productCopy">
          <p className="kicker">Produto</p>
          <h2>Do jantar de negócios ao app no bolso do empresário.</h2>
          <p>
            A experiência nasce para ser demonstrável nos encontros presenciais:
            o empresário se cadastra, escolhe um plano gratuito, acessa o que o
            plano libera e encontra caminhos claros para vender, comprar ou
            resolver um problema.
          </p>
          <div className="featureList">
            <span><BadgeCheck size={18} aria-hidden /> cadastro com plano</span>
            <span><Store size={18} aria-hidden /> marketplace B2B</span>
            <span><MessageSquareText size={18} aria-hidden /> chamados por área</span>
            <span><Smartphone size={18} aria-hidden /> PWA na entrega final</span>
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
            <BarChart3 size={20} aria-hidden />
            <strong>Demanda por módulo</strong>
            <span>dados orientam a próxima evolução</span>
          </div>
          <div className="floatingPanel bottom">
            <Layers3 size={20} aria-hidden />
            <strong>Acesso por plano</strong>
            <span>permissões ajustáveis no admin</span>
          </div>
        </div>
      </section>

      <section className="section" id="modulos">
        <div className="sectionHeading wide">
          <p className="kicker">Ecossistema</p>
          <h2>Módulos separados para crescer onde a comunidade mostrar demanda.</h2>
        </div>
        <div className="moduleGrid">
          {modules.map(([title, text], index) => (
            <article className="moduleCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
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
          <p className="kicker">Modelo operacional</p>
          <h2>O offline alimenta o online. O online prova o que gera valor.</h2>
          <p>
            O CNP parte de ativos reais: autoridade, jantares de negócios,
            espaço físico, acesso a empresários e curadoria de especialistas.
            A plataforma transforma essa energia em fluxo mensurável.
          </p>
        </div>
        <div className="proofGrid">
          <div><UsersRound size={24} aria-hidden /><strong>Formadores de opinião</strong><span>imagem e know-how para atrair a rede</span></div>
          <div><MapPin size={24} aria-hidden /><strong>Recorte por bairro</strong><span>atividade local e oportunidades por região</span></div>
          <div><Building2 size={24} aria-hidden /><strong>Fornecedores aprovados</strong><span>vitrine B2B com mais confiança</span></div>
          <div><BriefcaseBusiness size={24} aria-hidden /><strong>Especialistas</strong><span>diagnóstico, prazo e valor estimado</span></div>
        </div>
      </section>

      <section className="section" id="roadmap">
        <div className="sectionHeading">
          <p className="kicker">Roadmap</p>
          <h2>Três entregas, cada uma com valor próprio.</h2>
        </div>
        <div className="timeline">
          {roadmap.map((item) => (
            <article className="timelineItem" key={item.step}>
              <span className="tag">{item.tag}</span>
              <p>{item.step}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section plans" id="planos">
        <div className="sectionHeading wide">
          <p className="kicker">MVP</p>
          <h2>Planos gratuitos agora. Estrutura pronta para monetização futura.</h2>
          <p>
            No lançamento, os planos validam acesso e valor percebido sem
            cobrança. Pagamentos, split e comissão ficam preparados na arquitetura
            para uma fase futura.
          </p>
        </div>
        <div className="planGrid">
          {plans.map((plan) => (
            <article className="planCard" key={plan.name}>
              <p>{plan.forWho}</p>
              <h3>{plan.name}</h3>
              <strong>Grátis no MVP</strong>
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
          <h2>Pronto para apresentar uma plataforma que parece grande desde o primeiro encontro.</h2>
          <p>
            A landing posiciona o CNP como comunidade, produto e máquina de
            oportunidades: pronta para abrir conversa com empresários, parceiros
            e especialistas.
          </p>
        </div>
        <a className="primaryBtn light" href="mailto:contato@cnp.app.br?subject=Demonstra%C3%A7%C3%A3o%20CNP">
          Agendar apresentação
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
            <h2>Conectar empresários, gerar oportunidades e fortalecer negócios.</h2>
            <p>
              Um hub digital mobile-first para transformar relacionamento,
              comunidade e autoridade em fluxo mensurável de negócios.
            </p>
          </div>
          <div className="footerContact">
            <a href="mailto:contato@cnp.app.br">
              <Mail size={18} aria-hidden />
              contato@cnp.app.br
            </a>
            <a href="#produto">
              <Smartphone size={18} aria-hidden />
              Plataforma web e PWA
            </a>
          </div>
        </div>
        <div className="footerBottom">
          <span>CNP - Clube de Negócios Paulista</span>
          <nav aria-label="Links do rodapé">
            <a href="#produto">Produto</a>
            <a href="#modulos">Módulos</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#planos">Planos</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
