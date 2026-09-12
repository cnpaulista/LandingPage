/**
 * SPEC-018 - O PAINEL SO RENDERIZA O CARD QUE REALMENTE CHEGOU.
 *
 * ESTE ARQUIVO NASCEU DE UMA QUEDA EM PRODUCAO, em 2026-09-12.
 *
 * A pagina percorria uma lista fixa de ids e fazia `panel.cards[id].trend` sem
 * checar se aquele id veio no payload. O tipo dizia
 * `Record<MarketCardId, MarketPanelCard>` — um registro TOTAL — mas o valor vem
 * de `(await response.json()) as MarketPanelPayload`, um `as` sobre JSON de
 * fora. O compilador acreditava no tipo; o servidor recebeu outra coisa.
 *
 * O estouro foi exatamente este, no log do Vercel:
 *
 *     TypeError: Cannot read properties of undefined (reading 'trend')
 *         at Array.map
 *
 * O gatilho: a SPEC-018 acrescentou `politica` e `stf` a ordem dos cards, e a
 * landing passou a consultar a API do Back de producao — que ainda nao publica
 * essas duas editorias, porque o PR do Back nao tinha sido mergeado. Dois ids
 * pedidos, zero entregues, e a pagina inteira caiu: 500 em toda requisicao, e
 * build quebrado antes disso.
 *
 * A correcao aqui e mais do que um `if`. Ela torna a ORDEM DE PUBLICACAO
 * inofensiva: com esta funcao, landing nova contra Back antigo mostra os cards
 * que existem e omite os que nao existem, em vez de derrubar a pagina. A ordem
 * "Back antes da landing" continua sendo a certa — o que muda e que errar a
 * ordem deixa de ser um incidente.
 *
 * O tipo do payload virou `Partial<Record<...>>` no mesmo commit, para o
 * compilador parar de afirmar o que ele nao tem como saber.
 */
export function cardsPresentes<Id extends string, Card>(
  ordem: readonly Id[],
  cards: Partial<Record<Id, Card>> | null | undefined,
): Card[] {
  if (!cards) return [];

  return ordem
    .map((id) => cards[id])
    .filter((card): card is Card => card !== undefined && card !== null);
}
