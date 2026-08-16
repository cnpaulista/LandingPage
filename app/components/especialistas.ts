/**
 * SPEC-015:TASK-003 / AC-008 - busca dos especialistas consentidos.
 *
 * ISR DE 1 HORA, e o numero conversa com o Back. A rota assina a URL da foto com
 * 6h; revalidar a cada 1h da margem de 6x, entao a pagina nunca serve URL de
 * imagem morta. E a revogacao de consentimento propaga em ate 1h — bem dentro
 * das 24h que a AC-008 aceita. Ver D-015-01 na SPEC-015.
 *
 * FALHA DEVOLVE LISTA VAZIA, e a consequencia e o bloco sumir. E o
 * comportamento certo: publicar cache antigo depois de alguem revogar seria
 * manter na vitrine quem pediu para sair, e um erro de rede nao pode virar
 * violacao de consentimento.
 */
import type { EspecialistaPublico } from "./EspecialistasSection";

const REVALIDATE_SEGUNDOS = 3600;

export async function buscarEspecialistas(): Promise<EspecialistaPublico[]> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return [];

  try {
    const resposta = await fetch(`${base.replace(/\/$/, "")}/v1/public/specialists`, {
      next: { revalidate: REVALIDATE_SEGUNDOS },
    });
    if (!resposta.ok) return [];

    const corpo = (await resposta.json()) as { items?: EspecialistaPublico[] };
    /*
     * Projecao explicita tambem AQUI. O Back ja limita, mas repassar o objeto
     * cru faria a landing publicar qualquer campo novo que ele viesse a mandar —
     * e a landing e o ultimo ponto antes do olho do publico.
     */
    return (corpo.items ?? []).map((i) => ({
      id: i.id,
      name: i.name,
      photoUrl: i.photoUrl ?? null,
      specialties: Array.isArray(i.specialties) ? i.specialties : [],
    }));
  } catch {
    return [];
  }
}
