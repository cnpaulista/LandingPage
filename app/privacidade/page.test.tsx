/**
 * Aviso de Privacidade 1.1.0 - banco de producao nos Estados Unidos.
 *
 * O arquivo da pagina segue a regra "so afirma o que o sistema faz". Este teste
 * guarda as duas afirmacoes que mudaram e impede publicar sem a data do corte.
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacidadePage from "./page";

describe("Aviso de Privacidade 1.1.0", () => {
  it("nao promete mais que os dados ficam no Brasil", () => {
    const { container } = render(<PrivacidadePage />);
    const texto = container.textContent ?? "";

    expect(texto).not.toMatch(/armazenados no Brasil/i);
    expect(texto).not.toMatch(/Brasil \(São Paulo\)/);
    expect(texto).toMatch(/armazenados e processados nos Estados Unidos/i);
  });

  it("anuncia a versao nova, que e o que pede novo aceite no app", () => {
    render(<PrivacidadePage />);
    expect(screen.getByText(/Versão 1\.1\.0/)).toBeInTheDocument();
  });

  it("NAO sai sem a data real do corte do banco", () => {
    const { container } = render(<PrivacidadePage />);
    // Falha de proposito ate a data ser preenchida: publicar o marcador diria ao
    // associado que o aviso vale desde "[DATA DO CORTE]".
    expect(container.textContent).not.toContain("[DATA DO CORTE]");
  });
});
