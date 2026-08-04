import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cnp.app.br"),
  title: "CNP - Clube de Negócios Paulista",
  description:
    "A plataforma que conecta empresários, especialistas e fornecedores para gerar negócios e resolver demandas em poucos cliques.",
  openGraph: {
    title: "CNP - Clube de Negócios Paulista",
    description:
      "Conectar, gerar e fortalecer: um hub digital para empresários transformarem networking em negócios reais.",
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
