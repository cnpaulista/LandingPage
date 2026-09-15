import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

/**
 * `/api/` fica de fora: e o painel de noticias servido para a propria home, e
 * JSON indexado so apareceria como resultado sem sentido.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
