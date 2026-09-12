/**
 * SPEC-019:TASK-001 / TEST-001 - vitrine de pessoas sem pessoa nenhuma.
 *
 * O QUE ESTES TESTES GUARDAM, e que nao e obvio olhando a tela:
 *
 * 1. **A grade e forma, nao conteudo.** Seis molduras iguais lidas por leitor
 *    de tela viram "Espaco para foto / Nome / Empresa" dezoito vezes. O projeto
 *    ja documentou esse defeito duas vezes — `Avatar.tsx:55-59` (o "defeito do
 *    ciclo 41") e `marketplace/page.tsx:144-146`. Por isso a grade e
 *    `aria-hidden` e existe uma frase real fora dela.
 *
 * 2. **INV-070: zero pessoa real.** O componente nao pode ganhar nome proprio
 *    nem foto por descuido. A prova de mutacao esta em `page.test.tsx`, que
 *    varre o fonte — aqui se guarda a outra metade: a assinatura nao tem campo
 *    de pessoa, entao acrescentar um aparece no diff.
 */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VitrinePessoas, VITRINES } from "./VitrinePessoas";

describe("VitrinePessoas (AC-001, AC-003)", () => {
  it("renderiza o numero de espacos pedido", () => {
    const { container } = render(<VitrinePessoas {...VITRINES.formadores} />);
    expect(container.querySelectorAll(".vitrineEspaco")).toHaveLength(6);
  });

  it("a diretoria tem tres espacos, e nao seis", () => {
    const { container } = render(<VitrinePessoas {...VITRINES.diretoria} />);
    expect(container.querySelectorAll(".vitrineEspaco")).toHaveLength(3);
  });

  it("titulo e subtitulo sao os aprovados pelo cliente", () => {
    render(<VitrinePessoas {...VITRINES.formadores} />);
    expect(
      screen.getByRole("heading", { name: "Nossos empresários formadores de opinião" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Lideranças que conectam experiências e impulsionam o empreendedorismo local.",
      ),
    ).toBeInTheDocument();
  });

  it("AC-003: diz EM TEXTO que os nomes e fotos ainda vao chegar", () => {
    /*
     * Sem esta frase, seis molduras vazias sao lidas como defeito — e nao como
     * espaco reservado. E exatamente o erro que `marketplace/page.tsx:144-146`
     * registra ter cometido: bloco cinza transformou "sem foto" em "foto
     * quebrada".
     */
    render(<VitrinePessoas {...VITRINES.formadores} />);
    const aviso = screen.getByText(/entram assim que o clube enviar o material/i);
    expect(aviso).toBeInTheDocument();
    // Fora da grade escondida: precisa ser lido por quem usa leitor de tela.
    expect(aviso.closest("[aria-hidden]")).toBeNull();
  });
});

describe("Acessibilidade das molduras (AC-005)", () => {
  it("a grade inteira e aria-hidden: moldura sem pessoa e forma, nao conteudo", () => {
    const { container } = render(<VitrinePessoas {...VITRINES.formadores} />);
    const grade = container.querySelector(".vitrineGrid");

    expect(grade).not.toBeNull();
    expect(grade).toHaveAttribute("aria-hidden", "true");
  });

  it("o leitor de tela NAO recebe o rotulo do espaco repetido", () => {
    /*
     * CUIDADO COM A CONSULTA: `queryAllByText` NAO respeita `aria-hidden` — ele
     * varre o DOM. So as consultas `*ByRole` filtram pela arvore de
     * acessibilidade. A primeira versao deste teste usava `queryAllByText` e
     * falhou contra um componente CORRETO, provando que a asercao media outra
     * coisa.
     *
     * A propriedade que importa e: todo rotulo de moldura esta DENTRO de uma
     * subarvore escondida. E isso que um leitor de tela obedece.
     */
    const { container } = render(<VitrinePessoas {...VITRINES.formadores} />);

    const rotulos = [...container.querySelectorAll("span, p")].filter((el) =>
      ["Espaço para foto", "Nome", "Empresa"].includes(el.textContent ?? ""),
    );
    expect(rotulos.length).toBeGreaterThan(0);

    for (const rotulo of rotulos) {
      expect(rotulo.closest('[aria-hidden="true"]')).not.toBeNull();
    }

    // E o inverso: o que PRECISA ser ouvido nao pode estar escondido.
    const secao = screen.getByRole("region", { name: /formadores de opinião/i });
    expect(within(secao).getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("a secao tem nome acessivel, para nao virar mais uma regiao anonima", () => {
    render(<VitrinePessoas {...VITRINES.diretoria} />);
    expect(screen.getByRole("region", { name: /Diretoria em exercício/i })).toBeInTheDocument();
  });
});

describe("INV-070: zero identidade de pessoa", () => {
  it("nao renderiza nenhuma imagem", () => {
    // Enquanto esta spec valer, nao ha foto. Um `<img>` aqui seria a primeira
    // pessoa real entrando pela porta dos fundos — e a CSP de producao
    // (`img-src 'self' data: blob:`) nem a carregaria de um host externo.
    const { container } = render(<VitrinePessoas {...VITRINES.formadores} />);
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("as duas configuracoes aprovadas nao carregam campo de pessoa", () => {
    for (const vitrine of Object.values(VITRINES)) {
      const chaves = Object.keys(vitrine);
      // A assinatura de CON-080 e fechada: acrescentar `pessoas`, `nomes` ou
      // `fotos` muda o contrato e aparece no diff, que e o ponto da NFR-003.
      expect(chaves.sort()).toEqual(
        ["aviso", "espacos", "id", "kicker", "subtitulo", "titulo"].filter((k) =>
          chaves.includes(k),
        ),
      );
      for (const proibida of ["pessoas", "nomes", "fotos", "membros", "integrantes"]) {
        expect(chaves).not.toContain(proibida);
      }
    }
  });
});
