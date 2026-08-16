/**
 * SPEC-015:TASK-003 / AC-006 - Open Graph.
 *
 * O criterio diz "sem campo vazio", e o defeito real era `og:url` AUSENTE — o
 * cartao renderizava com imagem e ainda assim descumpria. Este teste le o objeto
 * de metadata exportado, que e a fonte do que o Next serve.
 */
import { describe, expect, it } from "vitest";
import { metadata } from "./layout";

describe("Open Graph (AC-006)", () => {
  it("serve os QUATRO campos preenchidos", () => {
    const og = metadata.openGraph as Record<string, unknown>;

    for (const campo of ["title", "description", "url", "images"] as const) {
      expect(og?.[campo], `og:${campo} vazio ou ausente`).toBeTruthy();
    }
  });

  it("a imagem resolve absoluta: caminho relativo sem metadataBase vira cartao sem imagem", () => {
    expect(metadata.metadataBase).toBeTruthy();
    const imagens = (metadata.openGraph as { images?: unknown }).images;
    expect(Array.isArray(imagens) ? imagens.length : 0).toBeGreaterThan(0);
  });
});
