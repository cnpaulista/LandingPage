import type { MetadataRoute } from "next";
import { servicos } from "./servicos/servicosContent";
import { SITE_URL } from "./site";

/**
 * Sem `lastModified`: o unico valor disponivel no build seria a hora do build,
 * e dizer ao Google que tudo mudou a cada deploy ensina ele a ignorar o campo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...servicos.map((s) => ({
      url: `${SITE_URL}/servicos/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/termos`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
