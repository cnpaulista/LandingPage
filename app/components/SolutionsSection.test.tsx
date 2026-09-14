/**
 * Cada solucao leva ao cadastro no app com o destino certo, e o app segue para
 * ele depois do cadastro (`Cliente/lib/destino.ts`).
 *
 * Os codigos de segmento sao os de `specialties.code` em PRODUCAO. Se alguem
 * trocar por nome aqui, o chamado abre sem segmento escolhido.
 */
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SolutionsSection from "./SolutionsSection";

const APP = "https://app.cnp.app.br/cadastro";

// [titulo do card, id, destino esperado, texto do botao]
const SOLUCOES: Array<[string, string, string, string]> = [
  ["Assessoria contábil", "contabil", "chamado:contabil", "Contrate um especialista"],
  ["Assessoria jurídica", "juridica", "chamado:juridico", "Contrate um especialista"],
  ["Crédito Bancário", "credito", "chamado:015", "Contrate um especialista"],
  ["Alvarás e Licenças", "alvaras", "chamado:sanitario", "Contrate um especialista"],
  ["Banco de talentos", "talentos", "chamado:seguros", "Contrate um especialista"],
  ["Educação para empresários", "educacao", "app", "Quero fazer parte"],
  ["Investidor Anjo", "investidor", "app", "Quero fazer parte"],
  ["Marketplace", "marketplace", "marketplace", "Acessar o marketplace"],
  ["Benefícios", "beneficios", "app", "Quero fazer parte"],
];

describe("soluções da landing levam ao ponto escolhido no app", () => {
  it.each(SOLUCOES)("%s: cadastro com destino %s e botão certo", async (titulo, id, destino, cta) => {
    render(<SolutionsSection />);

    await userEvent.click(screen.getByRole("button", { name: titulo }));
    const dialogo = screen.getByRole("dialog", { name: titulo });
    const botao = within(dialogo).getByRole("link", { name: new RegExp(cta, "i") });

    expect(botao).toHaveAttribute(
      "href",
      `${APP}?origem=solucao-${id}&destino=${encodeURIComponent(destino)}`,
    );
  });

  it("nenhum botão de solução volta a apontar para uma âncora da própria página", async () => {
    render(<SolutionsSection />);

    for (const [titulo] of SOLUCOES) {
      await userEvent.click(screen.getByRole("button", { name: titulo }));
      const botao = within(screen.getByRole("dialog")).getByRole("link");
      expect(botao.getAttribute("href")).not.toMatch(/^#/);
      await userEvent.click(screen.getByRole("button", { name: /fechar detalhes/i }));
    }
  });
});
