import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cnp.app.br"),
  title: "CNP - Clube de Negócios Paulista",
  description:
    "Hub de networking entre empresários com soluções empresariais, marketplace, crédito, talentos, cursos, marketing, investidores, eventos e notícias.",
  openGraph: {
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
