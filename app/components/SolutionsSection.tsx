"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CircleDollarSign,
  GraduationCap,
  Handshake,
  Megaphone,
  Plus,
  ShieldCheck,
  Store,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

type Solution = {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  products: string[];
};

const solutionCards: Solution[] = [
  {
    id: "contabil",
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
    id: "juridica",
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
    id: "credito",
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
    id: "licencas",
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
    id: "talentos",
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
    id: "marketplace",
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
    id: "cursos",
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
    id: "marketing",
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
    id: "investidor",
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
    id: "eventos",
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

export default function SolutionsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const active = openId ? (solutionCards.find((item) => item.id === openId) ?? null) : null;

  const close = useCallback(() => {
    setOpenId((current) => {
      if (current) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  useEffect(() => {
    if (!active) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close]);

  return (
    <section className="section solutions" id="solucoes">
      <div className="sectionHeading wide center">
        <p className="kicker">Soluções CNP</p>
        <h2>Soluções para o seu negócio</h2>
        <p>Tudo o que sua empresa precisa para avançar, em um só lugar. Toque em uma solução para ver os detalhes.</p>
      </div>

      <div className="solutionGrid">
        {solutionCards.map((item) => (
          <button
            type="button"
            className="solutionTile"
            key={item.id}
            ref={(node) => {
              triggerRefs.current[item.id] = node;
            }}
            onClick={() => setOpenId(item.id)}
            aria-haspopup="dialog"
            aria-expanded={openId === item.id}
          >
            <span className="solutionTileIcon">
              <item.icon size={30} aria-hidden />
            </span>
            <span className="solutionTileTitle">{item.title}</span>
            <span className="solutionTileHint" aria-hidden>
              <Plus size={14} />
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div className="solutionModalOverlay" onClick={close}>
          <div
            className="solutionModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="solutionModalTitle"
            aria-describedby="solutionModalText"
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="solutionModalClose" onClick={close} ref={closeRef} aria-label="Fechar detalhes">
              <X size={20} aria-hidden />
            </button>

            <span className="solutionModalIcon">
              <active.icon size={32} aria-hidden />
            </span>
            <p className="kicker">Solução CNP</p>
            <h3 id="solutionModalTitle">{active.title}</h3>
            <p id="solutionModalText" className="solutionModalText">
              {active.text}
            </p>

            <p className="solutionModalLabel">O que você encontra aqui</p>
            <ul className="solutionModalList">
              {active.products.map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>

            <a className="primaryBtn solutionModalCta" href="#participar" onClick={close}>
              Quero fazer parte
              <ArrowRight size={20} aria-hidden />
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
