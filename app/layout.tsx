import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cnp.app.br"),
  title: "CNP - Clube de Negócios Paulista",
  description:
    "Hub de networking entre empresários com soluções empresariais, marketplace, crédito, talentos, cursos, marketing, investidores, eventos e notícias.",
  /*
   * SPEC-015:AC-006 - os QUATRO campos preenchidos. `url` faltava, e sem ele o
   * validador de Open Graph renderiza cartao com campo vazio: o criterio pede
   * "sem campo vazio", nao "com imagem".
   *
   * `type` e `locale` nao estao no criterio, mas um cartao sem eles cai no
   * default do agregador e pode perder o idioma — custo zero, ganho real.
   */
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CNP - Clube de Negócios Paulista",
    url: "https://cnp.app.br",
    title: "CNP - Clube de Negócios Paulista",
    description:
      "Um hub de networking entre empresários para conectar, apresentar soluções e melhorar resultados.",
    images: ["/images/cnp-hero-networking.png"],
  },
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
