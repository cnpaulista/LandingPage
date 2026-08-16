/**
 * SPEC-015:TASK-003 - AC-004 / AC-007 - bloco de especialistas verificados.
 *
 * **ESTE COMPONENTE NAO DECIDE QUEM APARECE.** Ele renderiza exatamente o que
 * `GET /v1/public/specialists` devolveu, e a rota deriva de
 * `app_users.consent_showcase`.
 *
 * Isso e criterio e nao estilo. A AC-007 proibe "excecao manual em codigo ou em
 * arquivo estatico" — entao qualquer coisa que nascesse aqui e acrescentasse
 * gente (lista fixa, destaque, ordenacao curada, fallback de exemplo) seria a
 * excecao proibida, mesmo com o Back correto. Por isso a props e uma lista so, e
 * o componente nao tem nenhuma constante com nome de pessoa.
 *
 * LISTA VAZIA NAO RENDERIZA NADA. Nem titulo, nem placeholder. Um bloco vazio
 * prometeria prova social que nao existe, e "especialistas de exemplo" seria
 * gente publicada sem consentimento.
 */

export interface EspecialistaPublico {
  id: string;
  name: string;
  photoUrl: string | null;
  specialties: string[];
}

/** Iniciais para quando nao ha foto — a pessoa consentiu e nao pode sumir. */
function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0] ?? "";
  const ultima = partes.length > 1 ? (partes[partes.length - 1][0] ?? "") : "";
  return (primeira + ultima).toUpperCase();
}

export function EspecialistasSection({
  especialistas,
}: {
  especialistas: EspecialistaPublico[];
}) {
  if (especialistas.length === 0) return null;

  return (
    <section aria-labelledby="especialistas" className="especialistas">
      <h2 id="especialistas">Especialistas do clube</h2>
      <p className="especialistas-sub">
        Profissionais reconhecidos pela curadoria do CNP que aceitaram aparecer aqui.
      </p>

      <ul className="especialistas-grid">
        {especialistas.map((pessoa) => (
          <li key={pessoa.id} className="especialista-card">
            {pessoa.photoUrl ? (
              // `alt` com o nome: leitor de tela anuncia a pessoa, nao "imagem".
              <img src={pessoa.photoUrl} alt={pessoa.name} className="especialista-foto" />
            ) : (
              <span aria-hidden="true" className="especialista-iniciais">
                {iniciais(pessoa.name)}
              </span>
            )}

            <p className="especialista-nome">{pessoa.name}</p>
            <p className="especialista-segmentos">{pessoa.specialties.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
