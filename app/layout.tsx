import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cnp.app.br"),
  title: "CNP - Clube de Negócios Paulista",
  description:
    "Hub de soluções empresariais que reúne networking, marketplace, assessorias, crédito, cursos, eventos, benefícios e oportunidades para associados.",
  openGraph: {
    title: "CNP - Clube de Negócios Paulista",
    description:
      "Um hub empresarial para conectar, vender, aprender e crescer com soluções práticas para associados.",
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
