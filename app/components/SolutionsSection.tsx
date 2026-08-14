"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileSpreadsheet,
  Gift,
  GraduationCap,
  HandCoins,
  Landmark,
  Network,
  Rocket,
  Scale,
  ShoppingCart,
  TrendingUp,
  Users,
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

const networkHighlights: { icon: LucideIcon; text: string }[] = [
  { icon: Network, text: "Conexões que geram negócios" },
  { icon: TrendingUp, text: "Soluções que impulsionam resultados" },
  { icon: BookOpen, text: "Conteúdo e conhecimento para crescer" },
  { icon: Rocket, text: "Oportunidades para inovar e expandir" },
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
    <section className="solutionsBand" id="solucoes">
      <div className="solutionsInner">
        <div className="sectionHeading center">
          <p className="kicker">Soluções CNP</p>
          <h2>Soluções para o seu negócio</h2>
          <p>Tudo o que sua empresa precisa para avançar, em um só lugar.</p>
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
                <item.icon size={54} strokeWidth={2} />
              </span>
              <span className="solutionTileTitle">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="solutionsNetwork">
          <div className="solutionsNetworkTop">
            <Network size={44} strokeWidth={1.6} aria-hidden />
            <strong>Uma rede de soluções para empresários que querem crescer.</strong>
          </div>
          <div className="solutionsNetworkGrid">
            {networkHighlights.map((item) => (
              <div key={item.text}>
                <item.icon size={22} strokeWidth={1.7} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
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
              <active.icon size={38} strokeWidth={2} />
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
