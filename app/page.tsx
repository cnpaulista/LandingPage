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
    title: "Especialistas para resolver demandas reais",
    text: "Jurídico, contábil, financeiro, marketing e outras áreas de apoio ficam mais acessíveis para o dia a dia do negócio.",
  },
];

const modules = [
  {
    icon: Store,
    title: "Marketplace empresarial",
    text: "Uma vitrine para associados e fornecedores divulgarem soluções, produtos e serviços para a própria rede CNP.",
  },
  {
    icon: MessageSquareText,
    title: "Chamados a especialistas",
    text: "O associado descreve sua necessidade e recebe orientação de profissionais que entendem a realidade empresarial.",
  },
  {
    icon: CalendarDays,
    title: "Eventos e rodadas",
    text: "Jantares, encontros e rodadas de negócios aproximam empresários que querem gerar oportunidades concretas.",
  },
  {
    icon: BadgeCheck,
    title: "Benefícios e convênios",
    text: "Parcerias, vantagens e condições especiais fortalecem a permanência do associado dentro do clube.",
  },
  {
    icon: GraduationCap,
    title: "Universidade CNP",
    text: "Conteúdos, cursos, mentorias e trilhas de desenvolvimento para empresários, equipes e fornecedores.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Banco de oportunidades",
    text: "Espaço para vagas, talentos, indicações e demandas que circulam entre empresas da comunidade.",
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
            <a href="#produto">Produto</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#comunidade">Comunidade</a>
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
          <h1>Conexões empresariais para vender, comprar e resolver melhor.</h1>
          <p className="heroLead">
            O CNP reúne empresários, fornecedores e especialistas em uma rede
            feita para gerar negócios, fortalecer parcerias e aproximar soluções
            do dia a dia de quem empreende.
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
              <strong>Rede ativa</strong>
              <span>empresários, fornecedores e parceiros em um só ambiente</span>
            </div>
            <div>
              <strong>Vitrine B2B</strong>
              <span>produtos e serviços apresentados para a comunidade</span>
            </div>
            <div>
              <strong>Eventos</strong>
              <span>encontros e rodadas para transformar conversa em negócio</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro" id="beneficios">
        <div className="sectionHeading">
          <p className="kicker">Conectar. Gerar. Fortalecer.</p>
          <h2>O CNP aproxima quem precisa vender, comprar, contratar e resolver.</h2>
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
          <h2>Uma comunidade empresarial no presencial e no digital.</h2>
          <p>
            O associado entra no CNP para fazer relacionamento, divulgar sua
            empresa, acessar oportunidades, participar de eventos e encontrar
            apoio especializado sem depender de indicação solta ou grupos
            desorganizados.
          </p>
          <div className="featureList">
            <span><BadgeCheck size={18} aria-hidden /> perfil de negócio</span>
            <span><Store size={18} aria-hidden /> marketplace B2B</span>
            <span><MessageSquareText size={18} aria-hidden /> chamados a especialistas</span>
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
            <strong>Negócios em movimento</strong>
            <span>vitrine, contatos, pedidos e oportunidades em um só lugar</span>
          </div>
          <div className="floatingPanel bottom">
            <UsersRound size={20} aria-hidden />
            <strong>Comunidade próxima</strong>
            <span>relacionamento local com continuidade no digital</span>
          </div>
        </div>
      </section>

      <section className="section" id="modulos">
        <div className="sectionHeading wide">
          <p className="kicker">Como funciona</p>
          <h2>O que o associado encontra dentro do CNP.</h2>
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
          <h2>Relacionamento, presença local e solução prática para empresários.</h2>
          <p>
            O CNP nasce para apoiar quem empreende de verdade: gente que precisa
            vender, contratar, divulgar, resolver pendências, encontrar parceiros
            e estar perto de outros empresários que também fazem acontecer.
          </p>
        </div>
        <div className="proofGrid">
          <div><UsersRound size={24} aria-hidden /><strong>Empresários e lideranças</strong><span>uma rede para trocar experiência, reputação e oportunidade</span></div>
          <div><MapPin size={24} aria-hidden /><strong>Atuação regional</strong><span>conexões com foco em negócios locais e relações de confiança</span></div>
          <div><Building2 size={24} aria-hidden /><strong>Fornecedores aprovados</strong><span>vitrine B2B para quem quer vender para empresas</span></div>
          <div><BriefcaseBusiness size={24} aria-hidden /><strong>Especialistas parceiros</strong><span>apoio para demandas que travam o crescimento do negócio</span></div>
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
            Seja para vender, comprar, divulgar, contratar ou resolver demandas,
            o CNP aproxima você de empresários e parceiros com interesse real em
            fazer negócio.
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
            <h2>Conectar empresários, gerar oportunidades e fortalecer negócios.</h2>
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
              Plataforma web para associados
            </a>
          </div>
        </div>
        <div className="footerBottom">
          <span>CNP - Clube de Negócios Paulista</span>
          <nav aria-label="Links do rodapé">
            <a href="#produto">Produto</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#comunidade">Comunidade</a>
            <a href="#participar">Participar</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
