import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cnp.app.br"),
  title: "CNP - Clube de Negócios Paulista",
  description:
    "Clube empresarial que conecta empresários, fornecedores e especialistas para gerar negócios, fortalecer parcerias e resolver demandas do dia a dia.",
  openGraph: {
    title: "CNP - Clube de Negócios Paulista",
    description:
      "Conectar, gerar e fortalecer: uma comunidade empresarial para transformar relacionamento em negócios reais.",
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
