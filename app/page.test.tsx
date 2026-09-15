/**
 * SPEC-016:TASK-002 e TASK-003 / TEST-002 e TEST-003.
 *
 * POR QUE ESTE TESTE LE O FONTE EM VEZ DE RENDERIZAR A PAGINA.
 *
 * `page.tsx` e um Server Component `async` que chama `headers()` e faz `fetch`
 * da API do painel. Renderiza-lo aqui exigiria simular as duas coisas, e o
 * teste passaria a depender do mock — justamente o que a AC-003 nao quer
 * provar. O que ela pede e verificavel no fonte: quatro blocos ausentes, tres
 * destinos corretos, nenhuma ancora apontando para o vazio.
 *
 * E um teste de fitness, e nao de unidade: ele guarda uma propriedade
 * estrutural do arquivo, do mesmo jeito que a suite do Back guarda invariante
 * no banco.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const fonte = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");

describe("blocos removidos a pedido do cliente (AC-003)", () => {
  // As quatro marcas vieram das capturas enviadas em 2026-09-11. Cada uma
  // identifica um bloco e so ele.
  const removidos = [
    ["Como funciona", '<p className="kicker">Como funciona</p>'],
    ["Especialistas + Marketplace", 'className="visualStories"'],
    ["Vida real", 'className="proofBand"'],
    ["Comunidade", 'id="comunidade"'],
  ] as const;

  for (const [nome, marca] of removidos) {
    it(`nao renderiza mais o bloco "${nome}"`, () => {
      expect(fonte).not.toContain(marca);
    });
  }

  it("nao deixa para tras as constantes que so alimentavam esses blocos (AC-004)", () => {
    for (const morta of ["const modules =", "const visualStories =", "const community ="]) {
      expect(fonte).not.toContain(morta);
    }
  });
});

describe("blocos que PERMANECEM (AC-005)", () => {
  /*
   * Esta suite existe por causa da RISK-001, e nao por simetria.
   *
   * "Especialistas" e "Marketplace" nomeiam tres lugares diferentes desta
   * pagina, e so um deles foi capturado pelo cliente. Remover a vitrine
   * derrubaria a SPEC-015:TASK-003 — prova social derivada de consentimento
   * LGPD, provada em 2026-08-16. Este teste e o que impede isso de acontecer
   * por engano num refactor futuro.
   */
  it("mantem a vitrine de especialistas consentida (SPEC-015:AC-007)", () => {
    expect(fonte).toContain("<EspecialistasSection");
  });

  it("mantem a secao de solucoes, onde vive o card Marketplace", () => {
    expect(fonte).toContain("<SolutionsSection");
  });

  it("mantem as secoes que o menu referencia", () => {
    for (const id of ["produto", "diferencial", "beneficios", "participar", "noticias"]) {
      expect(fonte).toContain(`id="${id}"`);
    }
  });
});

describe("destinos de cadastro (AC-006, AC-007)", () => {
  it("nenhum CTA de cadastro leva a cliente de e-mail", () => {
    // O `mailto:` do rodape e canal de CONTATO e continua valendo; o que nao
    // pode voltar e o de cadastro, que trazia `subject` de "quero fazer parte".
    expect(fonte).not.toContain("mailto:contato@cnp.app.br?subject=");
  });

  it("os tres pontos de entrada usam o destino unico do modulo", () => {
    const usos = fonte.match(/href=\{destinoCadastro\}/g) ?? [];
    const noHero = /href=\{heroCopy\.ctaPrimario\.href\}/.test(fonte);

    // Dois por `destinoCadastro` (menu e faixa final) mais o do hero, que sai
    // do mesmo `urlCadastro`. Somados, sao os tres da AC-007.
    expect(usos).toHaveLength(2);
    expect(noHero).toBe(true);
  });

  it("o hero nao tem mais copy literal: ela vive no modulo testado a parte", () => {
    expect(fonte).toContain("heroCopy.titulo");
    expect(fonte).not.toContain("Um hub de networking entre empresários");
  });
});

describe("ancoras internas (NFR-004)", () => {
  /*
   * A superficie e a pagina MAIS os componentes que ela compoe, e nao so
   * `page.tsx`.
   *
   * Descoberto ao escrever este teste: `#solucoes` e alvo de dois links do
   * `page.tsx` e o `id` correspondente mora em `SolutionsSection.tsx:227`.
   * Varrer so o arquivo da pagina acusaria como quebrada uma ancora que
   * funciona — e um teste que grita errado e desligado na terceira vez.
   */
  const superficie = [
    fonte,
    ...["SolutionsSection", "EspecialistasSection", "VitrinePessoas", "ProjetoSection"].map((nome) =>
      readFileSync(join(process.cwd(), "app", "components", `${nome}.tsx`), "utf8"),
    ),
  ].join("\n");

  it("todo href de ancora encontra um id na superficie renderizada", () => {
    const ancoras = [...fonte.matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1]);
    const ids = new Set([...superficie.matchAll(/id="([a-z-]+)"/g)].map((m) => m[1]));

    expect(ancoras.length).toBeGreaterThan(0);
    const orfas = ancoras.filter((alvo) => !ids.has(alvo));
    expect(orfas, `ancoras sem destino: ${orfas.join(", ")}`).toEqual([]);
  });

  it("os ids dos blocos removidos sumiram junto com eles", () => {
    // Guarda o outro lado da NFR-004: se alguem devolver um link para
    // `#modulos` ou `#comunidade`, o teste acima pega; este pega o inverso,
    // um id que sobreviveu sem bloco.
    for (const morto of ["modulos", "comunidade"]) {
      expect(fonte).not.toContain(`id="${morto}"`);
    }
  });
});

describe("vitrines de pessoas (SPEC-019:AC-002, AC-004, AC-007)", () => {
  const vitrine = readFileSync(
    join(process.cwd(), "app", "components", "VitrinePessoas.tsx"),
    "utf8",
  );

  it("os dois blocos estao na pagina, entre participacao e o CTA final", () => {
    expect(fonte).toContain("<VitrinePessoas {...VITRINES.formadores} />");
    expect(fonte).toContain("<VitrinePessoas {...VITRINES.diretoria} />");

    // A ordem importa: o cliente pediu formadores primeiro, diretoria depois, e
    // o separador em gradiente nasce da regra de irmao adjacente no CSS.
    expect(fonte.indexOf("VITRINES.formadores")).toBeLessThan(
      fonte.indexOf("VITRINES.diretoria"),
    );
    // Depois da participacao e antes da faixa de contato.
    expect(fonte.indexOf('id="participar"')).toBeLessThan(fonte.indexOf("VITRINES.formadores"));
    expect(fonte.indexOf("VITRINES.diretoria")).toBeLessThan(fonte.indexOf('id="contato"'));
  });

  it("as quantidades sao as da referencia: seis e tres", () => {
    expect(vitrine).toContain("espacos: 6");
    expect(vitrine).toContain("espacos: 3");
  });

  /*
   * INV-070 — A GUARDA CONTRA COLAR NOMES NA VESPERA DO EVENTO.
   *
   * O componente nao pode ganhar identidade de pessoa por descuido. Esta e a
   * metade que varre o fonte; a outra, que guarda a assinatura do contrato,
   * esta em VitrinePessoas.test.tsx.
   *
   * PROVA DE MUTACAO: acrescentar `nomes: ["Fulano"]` a VITRINES derruba o caso
   * da chave proibida; trocar o icone por `<img src=...>` derruba o caso da
   * imagem. Guarda que nao muda nada quando violada nunca guardou coisa alguma.
   */
  it("INV-070: o componente nao carrega identidade de pessoa", () => {
    for (const proibida of ["pessoas:", "nomes:", "fotos:", "membros:", "integrantes:"]) {
      expect(vitrine).not.toContain(proibida);
    }
    // Sem imagem: a CSP de producao (`img-src 'self' data: blob:`) nem carregaria
    // foto de host externo, e nao ha foto local para carregar.
    expect(vitrine).not.toMatch(/<img\s/);
    expect(vitrine).not.toContain("next/image");
  });

  it("INV-070: nenhum literal com cara de nome de pessoa no fonte", () => {
    /*
     * Heuristica deliberadamente grosseira: duas palavras capitalizadas seguidas
     * dentro de aspas. Ela acusaria "Joao Silva" e tambem acusaria um titulo mal
     * colocado — e acusar demais, aqui, e o lado seguro do erro.
     *
     * Os textos aprovados da vitrine nao casam: comecam com palavra minuscula
     * depois da primeira ("Nossos empresarios...", "Diretoria em exercicio").
     */
    const suspeitos = [...vitrine.matchAll(/"([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-zà-ÿ]+ [A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-zà-ÿ]+)"/g)]
      .map((m) => m[1]);
    expect(suspeitos, `literais suspeitos de nome: ${suspeitos.join(", ")}`).toEqual([]);
  });

  it("nao reusa as classes mortas que a SPEC-016 deixou", () => {
    // `.visualStories` e `.proofBand` sao exatamente grades de cartao com foto —
    // o atalho obvio — e sao strings proibidas no fonte de page.tsx. As demais
    // sao resto a remover em task propria, nao material a reciclar.
    for (const morta of ["visualStories", "proofBand", "storyCard", "timelineItem", "moduleGrid"]) {
      expect(vitrine).not.toContain(morta);
    }
  });
});

describe("SPEC-020: painel so com editoria que traz imagem", () => {
  /** Extrai os ids de uma das duas listas de ordem declaradas em `page.tsx`. */
  function ordem(nome: string): string[] {
    // Sem regex de proposito: a marca tem `[` e `]`, e escapar isso dentro de um
    // template literal ja produziu `Unmatched ')'` uma vez neste arquivo.
    const marca = `const ${nome}: MarketCardId[] = [`;
    const inicio = fonte.indexOf(marca);
    if (inicio < 0) throw new Error(`lista ${nome} nao encontrada em page.tsx`);

    const corpo = fonte.slice(inicio + marca.length, fonte.indexOf("]", inicio + marca.length));
    return [...corpo.matchAll(/"([a-z]+)"/g)].map((m) => m[1]);
  }

  it("AC-001: a editoria de agro sumiu do fonte inteiro", () => {
    /*
     * Medido em producao em 2026-09-12: o card de Agro tinha 0 de 3 itens com
     * foto, porque o Canal Rural nao declara imagem em item nenhum. A varredura
     * e no fonte porque sobra de constante e de icone nao aparece na tela, e e
     * exatamente o tipo de resto que volta a ser usado por engano.
     */
    for (const marca of ['"agro"', "Wheat", "agroNews", "canalrural"]) {
      expect(fonte).not.toContain(marca);
    }
  });

  it("AC-005: a faixa traz os cinco indicadores, na ordem do print", () => {
    expect(ordem("indicadorOrder")).toEqual(["selic", "cdi", "usd", "eur", "ibovespa"]);
  });

  it("a grade traz so as tres editorias que tem foto", () => {
    expect(ordem("editoriaOrder")).toEqual(["economy", "politica", "stf"]);
  });

  it("as duas listas NAO se sobrepoem", () => {
    /*
     * Sem esta guarda, um id nas duas listas renderizaria o mesmo card duas
     * vezes — uma na faixa e outra na grade — e a duplicata so apareceria na
     * tela, nunca num teste.
     */
    const repetidos = ordem("indicadorOrder").filter((id) => ordem("editoriaOrder").includes(id));

    expect(repetidos).toEqual([]);
  });

  it("a faixa vem ANTES da grade no documento", () => {
    // A ordem do DOM e a ordem de leitura, e e o ponto do pedido do dono.
    expect(fonte.indexOf('className="marketFaixa"')).toBeGreaterThan(-1);
    expect(fonte.indexOf('className="marketFaixa"')).toBeLessThan(
      fonte.indexOf('className="marketGrid"'),
    );
  });

  it("o indicador na faixa NAO carrega noticia de apoio", () => {
    /*
     * Medido em producao: Dolar, Euro e Ibovespa exibiam TODOS a mesma manchete
     * do INPC, porque `relatedNews` e escolhida por assunto e os tres caem no
     * mesmo item. Tres repeticoes do mesmo texto, que na tela parecia defeito.
     *
     * A faixa corta isso pela raiz: ela renderiza rotulo, valor e unidade. A
     * noticia continua no card de Economia, que e o lugar dela.
     */
    const faixa = fonte.slice(
      fonte.indexOf('className="marketFaixa"'),
      fonte.indexOf('className="marketGrid"'),
    );

    expect(faixa).not.toContain("relatedNews");
    expect(faixa).not.toContain("leadNews");
  });
});
