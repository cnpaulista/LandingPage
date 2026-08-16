/**
 * SPEC-015:TASK-003 - AC-004 / AC-007 - bloco de especialistas.
 *
 * A landing NAO decide quem aparece: ela renderiza o que a rota publica devolve,
 * e a rota deriva do consentimento. Estes testes protegem justamente isso —
 * qualquer caminho de inclusao que nascesse AQUI (lista fixa, destaque, fallback
 * com gente de exemplo) seria a "excecao manual" que a AC-007 proibe, mesmo com
 * o Back correto.
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EspecialistasSection } from "./EspecialistasSection";

const UM = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "Ana Souza",
  photoUrl: "https://exemplo.test/foto.png",
  specialties: ["Jurídico", "Contábil"],
};

describe("Bloco de especialistas (AC-004/AC-007)", () => {
  it("renderiza nome, foto e especialidades de quem a rota devolveu", () => {
    render(<EspecialistasSection especialistas={[UM]} />);

    expect(screen.getByText("Ana Souza")).toBeInTheDocument();
    expect(screen.getByText(/Jurídico/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Ana Souza/i })).toHaveAttribute("src", UM.photoUrl);
  });

  it("sem foto usa INICIAIS, e nao esconde a pessoa", () => {
    render(<EspecialistasSection especialistas={[{ ...UM, photoUrl: null }]} />);

    // Storage fora do ar nao pode apagar quem consentiu em aparecer.
    expect(screen.getByText("Ana Souza")).toBeInTheDocument();
    expect(screen.getByText("AS")).toBeInTheDocument();
  });

  it("lista VAZIA nao renderiza o bloco, e nao inventa exemplos", () => {
    const { container } = render(<EspecialistasSection especialistas={[]} />);

    /*
     * O ponto nao e estetico. Um fallback com "especialistas de exemplo" seria
     * gente publicada sem consentimento — exatamente o que AC-007 proibe —, e
     * um bloco vazio com titulo prometeria prova social que nao existe.
     */
    expect(container).toBeEmptyDOMElement();
  });

  it("nao renderiza NENHUM campo alem dos tres, mesmo se a API mandar mais", () => {
    const comLixo = {
      ...UM,
      email: "ana@exemplo.test",
      document: "390.533.447-05",
      phone: "11988887777",
    } as never;

    const { container } = render(<EspecialistasSection especialistas={[comLixo]} />);

    /*
     * Defesa em profundidade: o Back ja limita a projecao, mas se um dia ele
     * passar a mandar mais, a tela nao pode publicar por acidente. A landing e
     * o ultimo ponto antes do olho do publico.
     */
    const html = container.innerHTML;
    expect(html).not.toContain("ana@exemplo.test");
    expect(html).not.toContain("390.533.447-05");
    expect(html).not.toContain("11988887777");
  });
});
