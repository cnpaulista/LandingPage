import { UserRound } from "lucide-react";

/**
 * SPEC-019:TASK-001 / MOD-080 / CON-080 - vitrine de pessoas, sem pessoa.
 *
 * O QUE ESTE COMPONENTE É, E O QUE ELE DELIBERADAMENTE NÃO É.
 *
 * O cliente pediu duas áreas — "empresários formadores de opinião" e "diretoria
 * em exercício" — e foi explícito: *"atualmente não temos dados, vamos colocar
 * só os espaços mesmo, depois eu trago fotos e informações."* Então isto entrega
 * a FORMA, e a forma sozinha.
 *
 * **INV-070 — não existe campo de pessoa nesta assinatura.** Não há `pessoas`,
 * `nomes`, `fotos`, nem constante com nome próprio, nem `<img>`. Isso não é
 * minimalismo: é a guarda contra o caminho fácil de, na véspera de um evento,
 * colar meia dúzia de nomes num arquivo de constantes. Acrescentar identidade
 * aqui exige mudar o contrato, o que aparece no diff e passa por revisão —
 * e a decisão de POR ONDE os dados reais entram está adiada de propósito em
 * `SPEC-019:D-019-03`, porque depende de saber quantas pessoas são, com que
 * frequência mudam e se são usuárias da plataforma.
 *
 * **A GRADE É `aria-hidden`, E ISSO É O PONTO MAIS FÁCIL DE DESFAZER SEM
 * PERCEBER.** Seis molduras idênticas, cada uma com "Espaço para foto", "Nome" e
 * "Empresa" legíveis, fazem um leitor de tela anunciar dezoito fragmentos sem
 * informação nenhuma. O projeto já documentou esse defeito duas vezes:
 * `Cliente/components/Avatar.tsx:55-59` (o "defeito do ciclo 41") e
 * `Cliente/app/marketplace/page.tsx:144-146`. Quem enxerga recebe a forma que o
 * cliente aprovou; quem usa leitor de tela recebe o título, o subtítulo e uma
 * frase honesta dizendo que o material ainda vem — uma vez cada.
 */

/** CON-080 — contrato fechado: sem campo de identidade, por INV-070. */
export interface VitrineProps {
  id: string;
  kicker?: string;
  titulo: string;
  subtitulo: string;
  /** Frase de estado, visível e legível por leitor de tela. Obrigatória. */
  aviso: string;
  /** Quantas molduras desenhar. Vem da imagem de referência do cliente. */
  espacos: number;
}

/**
 * As duas vitrines aprovadas em 2026-09-11, transcritas da imagem de referência.
 *
 * Vivem aqui, e não em `page.tsx`, pelo mesmo motivo de `heroContent.ts`: texto
 * que chegou como imagem precisa de um lugar só para ser conferido contra a
 * referência, em vez de espalhado por seis pontos de JSX.
 */
export const VITRINES = {
  formadores: {
    id: "quem-fortalece",
    kicker: "Quem fortalece nossa rede",
    titulo: "Nossos empresários formadores de opinião",
    subtitulo:
      "Lideranças que conectam experiências e impulsionam o empreendedorismo local.",
    aviso: "Os nomes e as fotos entram assim que o clube enviar o material.",
    espacos: 6,
  },
  diretoria: {
    id: "diretoria",
    titulo: "Diretoria em exercício",
    subtitulo:
      "Pessoas à frente da nossa associação e do fortalecimento dos empresários da região.",
    aviso: "Os nomes e as fotos entram assim que o clube enviar o material.",
    espacos: 3,
  },
} satisfies Record<string, VitrineProps>;

export function VitrinePessoas({ id, kicker, titulo, subtitulo, aviso, espacos }: VitrineProps) {
  const tituloId = `${id}-titulo`;

  return (
    <section className="section vitrineBand" id={id} aria-labelledby={tituloId}>
      <div className="sectionHeading wide">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h2 id={tituloId}>{titulo}</h2>
        <p>{subtitulo}</p>
      </div>

      {/*
        A frase de estado fica FORA da grade escondida, de propósito: ela é a
        única coisa que diz a verdade sobre o bloco, e precisa chegar a todo
        mundo. Sem ela, molduras vazias são lidas como defeito.
      */}
      <p className="vitrineAviso">{aviso}</p>

      {/*
        `aria-hidden="true"` escrito por extenso, e não na forma curta usada nos
        ícones desta pasta: aqui ele carrega uma decisão (D-019-04), e a forma
        explícita é a que sobrevive a um refactor distraído.
      */}
      <div className="vitrineGrid" aria-hidden="true">
        {Array.from({ length: espacos }, (_, indice) => (
          <article className="vitrineEspaco" key={`${id}-${indice}`}>
            <div className="vitrineFoto">
              <UserRound size={54} strokeWidth={1.4} />
              <span>Espaço para foto</span>
            </div>
            <p className="vitrineNome">Nome</p>
            <p className="vitrineEmpresa">Empresa</p>
          </article>
        ))}
      </div>
    </section>
  );
}
