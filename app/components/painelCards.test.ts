import { describe, expect, it } from "vitest";

import { cardsPresentes } from "./painelCards";

const ORDEM = ["usd", "eur", "ibovespa", "selic", "agro", "economy", "politica", "stf"] as const;

/** Card minimo: so o que os testes precisam distinguir. */
const card = (id: string) => ({ id, trend: "flat" as const });

describe("cardsPresentes", () => {
  it("REPRODUZ A QUEDA DE 2026-09-12: oito ids pedidos, seis entregues", () => {
    /*
     * Este e o caso exato que derrubou a producao. A SPEC-018 acrescentou
     * `politica` e `stf` a ordem, a landing passou a falar com o Back de
     * producao, e o Back ainda nao publicava as duas editorias.
     *
     * Antes desta funcao, o `.map` devolvia `undefined` nessas duas posicoes e
     * a pagina estourava em `card.trend`. A asercao que importa nao e o
     * tamanho: e que NENHUM buraco atravessa.
     */
    const entregues = {
      usd: card("usd"),
      eur: card("eur"),
      ibovespa: card("ibovespa"),
      selic: card("selic"),
      agro: card("agro"),
      economy: card("economy"),
    };

    const visiveis = cardsPresentes(ORDEM, entregues);

    expect(visiveis).toHaveLength(6);
    expect(visiveis.every((c) => c !== undefined && c !== null)).toBe(true);
    expect(visiveis.map((c) => c.id)).toEqual(["usd", "eur", "ibovespa", "selic", "agro", "economy"]);
  });

  it("preserva a ordem declarada, e nao a ordem em que o payload chegou", () => {
    // O Back nao promete ordem de chaves em JSON; a ordem e decisao da landing.
    const foraDeOrdem = { stf: card("stf"), usd: card("usd"), politica: card("politica") };

    expect(cardsPresentes(ORDEM, foraDeOrdem).map((c) => c.id)).toEqual(["usd", "politica", "stf"]);
  });

  it("id que chega mas nao esta na ordem NAO aparece", () => {
    /*
     * O contrario tambem tem de valer: um Back mais novo que a landing pode
     * publicar um card que esta landing nao sabe desenhar. Ignorar e o
     * comportamento certo — renderizar um card desconhecido seria pior.
     */
    const comExtra = { usd: card("usd"), cripto: card("cripto") } as Record<string, ReturnType<typeof card>>;

    expect(cardsPresentes(ORDEM, comExtra).map((c) => c.id)).toEqual(["usd"]);
  });

  it("payload sem card nenhum devolve lista vazia, e nao estoura", () => {
    expect(cardsPresentes(ORDEM, {})).toEqual([]);
  });

  it("cards nulo ou ausente devolve lista vazia", () => {
    // `fetchMarketPanel` pode devolver forma inesperada: o `as` nao valida nada.
    expect(cardsPresentes(ORDEM, null)).toEqual([]);
    expect(cardsPresentes(ORDEM, undefined)).toEqual([]);
  });

  it("card explicitamente nulo e tratado como ausente", () => {
    /*
     * `{"politica": null}` e JSON perfeitamente valido, e um Back que degrade
     * assim nao pode derrubar a pagina. O filtro cobre os dois: `undefined` de
     * chave faltando e `null` de chave presente e vazia.
     */
    const comNulo = { usd: card("usd"), politica: null } as unknown as Partial<
      Record<(typeof ORDEM)[number], ReturnType<typeof card>>
    >;

    expect(cardsPresentes(ORDEM, comNulo).map((c) => c.id)).toEqual(["usd"]);
  });
});
