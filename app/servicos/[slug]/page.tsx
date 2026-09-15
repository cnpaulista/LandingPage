import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { urlCadastro } from "../../components/heroContent";
import { projetoCopy } from "../../components/projetoContent";
import { SEM_DESTINO_CLARO, destinoDaSolucao, solutionCards } from "../../components/solucoesContent";
import {
  CONTATO_COMERCIAL,
  EMPRESA,
  OG_IMAGEM,
  SITE_NOME,
  jsonLdServico,
  serializarJsonLd,
} from "../../site";
import { servicoPorSlug, servicos } from "../servicosContent";
import "../servicos.css";

/*
 * Estatico: quatro paginas conhecidas no build. `dynamicParams = false` faz
 * slug desconhecido cair em 404 de verdade, em vez de render sob demanda de
 * uma pagina que nao existe.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return servicos.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const servico = servicoPorSlug((await params).slug);
  if (!servico) return {};
  const caminho = `/servicos/${servico.slug}`;
  return {
    title: servico.metaTitulo,
    description: servico.metaDescricao,
    alternates: { canonical: caminho },
    openGraph: {
      title: servico.metaTitulo,
      description: servico.metaDescricao,
      url: caminho,
      // O `openGraph` da pagina SUBSTITUI o do layout, nao mescla: sem repetir
      // tipo, idioma e imagem aqui, o cartao da pagina sai sem eles.
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NOME,
      images: [OG_IMAGEM],
    },
  };
}

export default async function ServicoPage({ params }: Props) {
  const servico = servicoPorSlug((await params).slug);
  if (!servico) notFound();

  const trechos = servico.projeto.map((trecho) => {
    const bloco = projetoCopy.blocos.find((b) => b.icone === trecho.bloco);
    if (!bloco) throw new Error(`bloco "${trecho.bloco}" ausente em projetoContent`);
    const paragrafos = trecho.paragrafos
      ? trecho.paragrafos.map((i) => bloco.paragrafos[i])
      : bloco.paragrafos;
    return { ...bloco, paragrafos };
  });

  const solucoes = servico.solucoes.map((id) => {
    const solucao = solutionCards.find((s) => s.id === id);
    if (!solucao) throw new Error(`solucao "${id}" ausente em solucoesContent`);
    return solucao;
  });
  const principal = solucoes[0];
  const destino = destinoDaSolucao[principal.id] ?? SEM_DESTINO_CLARO;
  const outros = servicos.filter((s) => s.slug !== servico.slug);

  return (
    <main className="servicoPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializarJsonLd(
            jsonLdServico({
              nome: servico.nome,
              descricao: servico.metaDescricao,
              caminho: `/servicos/${servico.slug}`,
            }),
          ),
        }}
      />

      <header className="servicoHero">
        <div className="servicoTopo">
          <Link href="/" className="servicoMarca" aria-label={`${SITE_NOME} - início`}>
            <Image src="/images/cnp-logo-transparent.png" alt={SITE_NOME} width={180} height={120} priority />
          </Link>
          <a className="navCta" href={urlCadastro(`servico-${servico.slug}`)}>
            <span>Fazer parte</span>
            <ArrowRight size={18} aria-hidden />
          </a>
        </div>
        <nav className="servicoTrilha" aria-label="Você está em">
          <Link href="/">Início</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{servico.nome}</span>
        </nav>
        <p className="kicker">Soluções CNP</p>
        <h1>{servico.h1}</h1>
        <p className="servicoLead">{principal.text}</p>
      </header>

      {trechos.map((trecho) => (
        <section className="servicoBloco" key={trecho.icone}>
          <div className="servicoBlocoTexto">
            <h2>{trecho.titulo}</h2>
            {trecho.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Image
            className="servicoBlocoImagem"
            src={trecho.capa}
            alt=""
            width={800}
            height={500}
            sizes="(max-width: 860px) calc(100vw - 40px), 460px"
          />
        </section>
      ))}

      {servico.exemplo ? (
        <section className="servicoExemplo">
          <h2>{projetoCopy.exemplo.titulo}</h2>
          {projetoCopy.exemplo.paragrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ) : null}

      <section className="servicoSolucoes" aria-labelledby="servico-solucoes">
        <h2 id="servico-solucoes">O que você encontra aqui</h2>
        <div className="servicoSolucoesGrade">
          {solucoes.map((solucao) => (
            <article className="servicoSolucao" key={solucao.id}>
              <span className="servicoSolucaoIcone">
                <solucao.icon size={26} aria-hidden />
              </span>
              <h3>{solucao.title}</h3>
              <p>{solucao.text}</p>
              <ul>
                {solucao.products.map((produto) => (
                  <li key={produto}>
                    <Check size={16} aria-hidden />
                    {produto}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="servicoCta">
        <h2>{projetoCopy.fechamento.titulo}</h2>
        <p>{projetoCopy.fechamento.paragrafos[2]}</p>
        <div className="servicoCtaAcoes">
          <a
            className="primaryBtn"
            href={urlCadastro(`servico-${servico.slug}`, destino.destino)}
          >
            {destino.cta}
            <ArrowRight size={20} aria-hidden />
          </a>
          <Link className="servicoLinkProjeto" href="/#projeto">
            Conhecer o projeto completo
          </Link>
        </div>
      </section>

      <nav className="servicoOutros" aria-labelledby="servico-outros">
        <h2 id="servico-outros">Outras frentes do clube</h2>
        <ul>
          {outros.map((outro) => (
            <li key={outro.slug}>
              <Link href={`/servicos/${outro.slug}`}>
                {outro.h1}
                <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="servicoRodape">
        <span>
          CNP - Clube de Negócios Paulista · {EMPRESA.razaoSocial} · CNPJ {EMPRESA.cnpj}
        </span>
        <a href={CONTATO_COMERCIAL.telefoneHref}>
          {CONTATO_COMERCIAL.nome} · {CONTATO_COMERCIAL.telefone}
        </a>
        <a href="mailto:contato@cnp.app.br">contato@cnp.app.br</a>
        <Link href="/privacidade">Privacidade</Link>
        <Link href="/termos">Termos</Link>
      </footer>
    </main>
  );
}
