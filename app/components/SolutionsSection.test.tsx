/**
 * O botao "Quero fazer parte" de cada solucao leva ao cadastro no app.
 *
 * Antes ele apontava para `#participar` e so rolava a pagina: quem abriu a
 * solucao e decidiu entrar tinha de achar um segundo botao no fim da landing.
 */
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SolutionsSection from "./SolutionsSection";

const SOLUCOES: Array<[string, string]> = [
  ["Assessoria contábil", "contabil"],
  ["Assessoria jurídica", "juridica"],
  ["Crédito Bancário", "credito"],
  ["Alvarás e Licenças", "alvaras"],
  ["Banco de talentos", "talentos"],
  ["Educação para empresários", "educacao"],
  ["Investidor Anjo", "investidor"],
  ["Marketplace", "marketplace"],
  ["Benefícios", "beneficios"],
];

describe("soluções da landing levam ao cadastro", () => {
  it.each(SOLUCOES)("%s: o botão abre o cadastro no app com a origem da solução", async (titulo, id) => {
    render(<SolutionsSection />);

    await userEvent.click(screen.getByRole("button", { name: titulo }));
    const dialogo = screen.getByRole("dialog", { name: titulo });
    const botao = within(dialogo).getByRole("link", { name: /quero fazer parte/i });

    expect(botao).toHaveAttribute("href", `https://app.cnp.app.br/cadastro?origem=solucao-${id}`);
  });

  it("nenhum botão de solução volta a apontar para uma âncora da própria página", async () => {
    render(<SolutionsSection />);

    for (const [titulo] of SOLUCOES) {
      await userEvent.click(screen.getByRole("button", { name: titulo }));
      const botao = within(screen.getByRole("dialog")).getByRole("link", { name: /quero fazer parte/i });
      expect(botao.getAttribute("href")).not.toMatch(/^#/);
      await userEvent.click(screen.getByRole("button", { name: /fechar detalhes/i }));
    }
  });
});
