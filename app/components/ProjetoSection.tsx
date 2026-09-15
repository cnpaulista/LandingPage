import {
  ArrowRight,
  BadgePercent,
  GraduationCap,
  HandCoins,
  Handshake,
  Megaphone,
  Pizza,
  Stamp,
  UserCheck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { destinoCadastro } from "./heroContent";
import { projetoCopy, type ProjetoBloco } from "./projetoContent";

/**
 * Secao "O projeto" (`#projeto`), alvo do botao secundario do hero.
 *
 * O texto e longo — doze blocos — e por isso a secao alterna fundos: abertura
 * escura (continua o hero), frentes em cartoes claros, exemplo em faixa de
 * destaque e fechamento com o CTA. Sem essa alternancia, no celular vira uma
 * parede de paragrafos sem ponto de parada.
 *
 * O CTA usa `destinoCadastro`, o mesmo destino unico da SPEC-016:AC-007. Nao
 * cria origem nova: `origem` e medida pela SPEC-015:AC-002, e valor novo ali e
 * decisao de medicao, nao de layout.
 */

const icones: Record<ProjetoBloco["icone"], LucideIcon> = {
  negociacao: HandCoins,
  servicos: UserCheck,
  burocracia: Stamp,
  parcerias: Handshake,
  educacao: GraduationCap,
  descontos: BadgePercent,
  oportunidades: Waypoints,
  diretoria: Megaphone,
};

export function ProjetoSection() {
  const { abertura, proposta, blocos, exemplo, fechamento } = projetoCopy;
  const dominioApp = new URL(destinoCadastro).host;

  return (
    <section className="projetoBand" id="projeto" aria-labelledby="projeto-titulo">
      <div className="projetoAbertura">
        <div className="projetoAberturaInner">
          <div className="projetoAberturaCopy">
            <p className="kicker">{projetoCopy.kicker}</p>
            <h2 id="projeto-titulo">{abertura.titulo}</h2>
            {abertura.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="projetoAberturaVisual">
            <div className="projetoAberturaMedia">
              <Image
                className="projetoImagemGrande"
                src="/images/projeto/projeto-abertura.webp"
                alt="Comerciante conferindo as contas no fim do expediente"
                width={960}
                height={1200}
                sizes="(max-width: 980px) calc(100vw - 40px), (max-width: 1220px) 41vw, 506px"
              />
            </div>
            <div className="projetoProposta">
              <h3>{proposta.titulo}</h3>
              {proposta.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="projetoFrentes">
        {blocos.map((bloco, index) => {
          const Icone = icones[bloco.icone];
          return (
            <article className="projetoCard" key={bloco.titulo}>
              <div className="projetoCardCapa">
                <Image
                  src={bloco.capa}
                  alt=""
                  width={800}
                  height={500}
                  sizes="(max-width: 980px) calc(100vw - 40px), (max-width: 1220px) calc((100vw - 58px) / 2), 581px"
                />
                <span className="projetoCardNumero" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="projetoIcone">
                  <Icone size={26} aria-hidden />
                </span>
              </div>
              <div className="projetoCardConteudo">
                <h3>{bloco.titulo}</h3>
                {bloco.paragrafos.map((p, paragraphIndex) => (
                  <p className={paragraphIndex === 0 ? "projetoCardLead" : undefined} key={p}>
                    {p}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="projetoExemplo">
        <div className="projetoExemploMedia">
          <Image
            className="projetoImagemGrande"
            src="/images/projeto/projeto-exemplo-pizzaria.webp"
            alt="Pizzaiolo preparando massa perto do forno"
            width={1200}
            height={900}
            sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 1220px) 40vw, 472px"
          />
        </div>
        <div className="projetoExemploConteudo">
          <span className="projetoIcone projetoExemploIcone">
            <Pizza size={26} aria-hidden />
          </span>
          <h3>{exemplo.titulo}</h3>
          {exemplo.paragrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="projetoFechamento">
        <Image
          className="projetoImagemGrande projetoFechamentoImagem"
          src="/images/projeto/projeto-fechamento.webp"
          alt="Empresários locais reunidos em um encontro comunitário"
          width={1600}
          height={900}
          sizes="(max-width: 1020px) calc(100vw - 40px), 980px"
        />
        <div className="projetoFechamentoCopy">
          <h3>{fechamento.titulo}</h3>
          {fechamento.paragrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="projetoAssinatura">{fechamento.assinatura}</p>
          <a className="primaryBtn" href={destinoCadastro}>
            {fechamento.cta}
            <ArrowRight size={20} aria-hidden />
          </a>
          <span className="projetoDominio">{dominioApp}</span>
        </div>
      </div>
    </section>
  );
}
