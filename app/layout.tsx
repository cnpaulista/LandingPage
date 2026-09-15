import type { Metadata } from "next";
import { HOME_DESCRICAO, HOME_TITULO, OG_IMAGEM, SITE_NOME, SITE_URL } from "./site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /*
   * `default` e o titulo da home; `template` monta o das paginas internas
   * ("Abertura de empresas... | Clube de Negócios Paulista"). O nome vai no fim
   * de proposito: quem busca o assunto le primeiro o assunto.
   */
  title: { default: HOME_TITULO, template: `%s | ${SITE_NOME}` },
  description: HOME_DESCRICAO,
  /*
   * SPEC-015:AC-006 - os QUATRO campos preenchidos. `url` faltava, e sem ele o
   * validador de Open Graph renderiza cartao com campo vazio: o criterio pede
   * "sem campo vazio", nao "com imagem".
   *
   * `type` e `locale` nao estao no criterio, mas um cartao sem eles cai no
   * default do agregador e pode perder o idioma — custo zero, ganho real.
   *
   * A imagem era o PNG do hero, de 1,9 MB: WhatsApp e redes cortam ou desistem
   * de previa desse tamanho. `cnp-og.jpg` tem 1200x630, o formato do cartao.
   */
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NOME,
    url: SITE_URL,
    title: HOME_TITULO,
    description: HOME_DESCRICAO,
    images: [OG_IMAGEM],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
