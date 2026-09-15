"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Network,
  Rocket,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";
import { urlCadastro } from "./heroContent";
import { SEM_DESTINO_CLARO, destinoDaSolucao, solutionCards } from "./solucoesContent";

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

            {/*
              VAI PARA O CADASTRO NO APP, e de la para o ponto escolhido.

              A solucao vai na `origem` (medicao da SPEC-015:AC-002) e o ponto
              de chegada no `destino`, que o app guarda ate o cadastro terminar.
            */}
            <a
              className="primaryBtn solutionModalCta"
              href={urlCadastro(
                `solucao-${active.id}`,
                (destinoDaSolucao[active.id] ?? SEM_DESTINO_CLARO).destino,
              )}
            >
              {(destinoDaSolucao[active.id] ?? SEM_DESTINO_CLARO).cta}
              <ArrowRight size={20} aria-hidden />
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
