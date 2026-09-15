/**
 * Secao "O projeto" - texto do cliente de 2026-09-15.
 *
 * `TEXTO_ENVIADO` e o texto como chegou, com os titulos em CAIXA-ALTA e um
 * paragrafo por linha. O modulo guarda os titulos em caixa mista (a caixa-alta
 * e CSS), entao a conferencia compara o titulo em maiusculas e os paragrafos
 * por igualdade exata. Uma virgula trocada em qualquer lado quebra este teste.
 */
import { render, screen } from "@testing-library/react";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { destinoCadastro } from "./heroContent";
import { ProjetoSection } from "./ProjetoSection";
import { projetoCopy } from "./projetoContent";

const imagensGrandes = [
  "/images/projeto/projeto-abertura.webp",
  "/images/projeto/projeto-exemplo-pizzaria.webp",
  "/images/projeto/projeto-fechamento.webp",
] as const;

const limitesPorImagem = new Map<string, number>([
  [imagensGrandes[0], 180 * 1024],
  [imagensGrandes[1], 180 * 1024],
  [imagensGrandes[2], 220 * 1024],
  ["/images/projeto/capa-negociacao.webp", 70 * 1024],
  ["/images/projeto/capa-servicos.webp", 70 * 1024],
  ["/images/projeto/capa-burocracia.webp", 70 * 1024],
  ["/images/projeto/capa-parcerias.webp", 70 * 1024],
  ["/images/projeto/capa-educacao.webp", 70 * 1024],
  ["/images/projeto/capa-descontos.webp", 70 * 1024],
  ["/images/projeto/capa-oportunidades.webp", 70 * 1024],
  ["/images/projeto/capa-diretoria.webp", 70 * 1024],
]);

function arquivoPublico(src: string): string {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

const TEXTO_ENVIADO = `QUEM EMPREENDE SOZINHO PAGA MAIS CARO PARA CRESCER
O fornecedor aumenta o preço. O banco cobra caro. A maquininha leva parte da margem. Encontrar profissionais de confiança dá trabalho, contratar gente preparada está difícil e a burocracia consome o tempo que você deveria dedicar à sua empresa.
Você compra, vende, contrata, paga impostos, resolve problemas e ainda precisa encontrar força para crescer. Agora imagine contar com uma comunidade empresarial organizada para enfrentar esses desafios junto com você.
É essa força que estamos construindo com o Clube de Negócios Paulista, a nossa associação comercial e industrial.
EMPRESAS INDEPENDENTES. UMA FORÇA COLETIVA.
Nossa proposta é unir empresários da Zona Sul, de M’Boi Mirim e adjacências para transformar necessidades em comum em melhores condições de compra, serviços qualificados, conhecimento e oportunidades de negócios.
Cada empresa continua com sua identidade, sua gestão e suas decisões. A união amplia o acesso ao que, sozinho, muitas vezes custa mais caro ou parece distante.
Quem já cresceu compartilha experiência. Quem está começando encontra orientação. E todos ajudam a construir uma economia local mais forte.
MAIS FORÇA COM BANCOS, MAQUININHAS E FORNECEDORES
Uma empresa negociando apresenta seu próprio volume. Uma associação organizada pode reunir a demanda de muitos negócios e ampliar seu poder de negociação.
Queremos usar essa força para buscar melhores taxas, prazos e condições com bancos, operadoras de cartão, fabricantes, distribuidores e prestadores de serviços, considerando o perfil de cada empresa.
Compras coletivas, parcerias e oportunidades de importação fazem parte dessa proposta. Ao somar o que nossas empresas consomem, podemos abrir portas para condições que muitos pequenos e médios empresários dificilmente conseguiriam individualmente.
Também queremos facilitar o acesso a ferramentas de consulta e proteção ao crédito, ajudando o empresário a avaliar riscos e tomar decisões mais seguras nas vendas.
SERVIÇOS QUALIFICADOS E MAIS CONFIANÇA PARA CONTRATAR
Todo empresário conhece o prejuízo de contratar alguém que promete muito e entrega pouco.
Estamos estruturando uma rede de especialistas com avaliação de capacidade técnica, referências e histórico de atendimento. A proposta inclui acompanhar solicitações, prazos, entregas e avaliações de quem contratou, oferecendo mais critérios para escolher e reduzir o risco de prejuízos.
Assessoria contábil e jurídica, crédito empresarial, marketing, tecnologia, recursos humanos, licenças e alvarás estarão entre as frentes dessa estrutura.
Queremos aproximar o empresário de profissionais preparados e usar a demanda coletiva para buscar serviços de qualidade com preços competitivos.
MENOS BUROCRACIA PARA ABRIR, REGULARIZAR E CRESCER
Nossa estrutura prevê apoio à abertura e legalização de empresas, serviços de Junta Comercial, emissão de certificado digital e orientação para registro de marcas e patentes.
Queremos facilitar o acesso aos profissionais e procedimentos necessários para que o empresário organize sua documentação, proteja sua marca e mantenha seu negócio regularizado.
O projeto também contempla buscar a implantação de um posto interno de atendimento da Receita Federal, mediante convênio e autorização, para aproximar o atendimento de quem empreende.
PARCERIAS QUE AMPLIAM NOSSA CAPACIDADE DE ENTREGA
Queremos construir parcerias com o Sebrae, a OAB e a Junta Comercial para aproximar os associados de orientação empresarial, educação jurídica, capacitação e serviços de registro.
Essas parcerias fazem parte da estrutura que pretendemos consolidar para levar conhecimento e apoio prático à rotina das empresas.
GENTE PREPARADA PARA FAZER SUA EMPRESA CRESCER
Uma empresa melhora quando quem está à frente e quem está na operação têm acesso ao conhecimento.
Por isso, nosso projeto inclui um canal de educação para empresários e funcionários, com cursos, palestras, oficinas e treinamentos voltados aos desafios reais do negócio: atendimento, vendas, gestão, finanças, tecnologia e preparação para o trabalho.
Também estamos construindo um banco de vagas e talentos com profissionais indicados por empresários e outros profissionais, com referências verificadas e informações sobre suas qualificações.
A indicação abre a porta. A avaliação ajuda a dar mais segurança à contratação. E a capacitação prepara as pessoas para entregar um trabalho melhor.
CLUBE DE DESCONTOS E BENEFÍCIOS PARA QUEM PARTICIPA
Queremos reunir condições especiais em produtos, serviços e benefícios para empresários e suas equipes.
O Clube de Descontos será voltado à negociação de vantagens com empresas parceiras, incluindo oportunidades em saúde, odontologia, educação, bem-estar e serviços para o negócio.
A proposta é fazer a participação na associação gerar valor também nas despesas do dia a dia.
CLUBE DE OPORTUNIDADES E CONEXÕES QUE GERAM NEGÓCIOS
O cliente que você procura pode estar dentro da comunidade. O fornecedor de que precisa também. E uma solução que parece difícil pode já fazer parte da experiência de outro empresário.
Nosso Clube de Oportunidades pretende reunir demandas de compra, ofertas de serviços, parcerias comerciais e conexões com investidores.
Jantares empresariais, encontros e o marketplace serão caminhos para apresentar sua empresa, construir confiança e abrir portas.
Também está prevista a locação de espaços para reuniões, cursos, treinamentos e eventos, ampliando o acesso a ambientes adequados para receber clientes, desenvolver equipes e fazer negócios.
UMA DIRETORIA FORTE PARA DAR VOZ A QUEM EMPREENDE
O empresário precisa ser ouvido e ter suas demandas acompanhadas.
Nossa proposta inclui uma diretoria forte, influente e atuante, capaz de dialogar com o poder público, apresentar os desafios da região e cobrar respostas com organização, dados e prioridades.
O número de empresas participantes, os empregos que geram e as dificuldades que compartilham dão consistência a essa representação.
Queremos transformar essas informações em propostas para reduzir burocracias e buscar melhorias em infraestrutura, iluminação, segurança e condições para trabalhar e investir.
MAIS CONHECIMENTO PARA VENDER. MAIS ESCALA PARA COMPRAR.
Imagine uma pizzaria que vende de 500 a 1.000 pizzas por dia e outra que vende 100. A experiência de quem já opera em maior volume pode ajudar a outra a melhorar a produção, o atendimento, a qualidade e as vendas.
Depois, essas pizzarias podem reunir sua demanda de farinha, queijo, proteínas e embalagens para negociar com fornecedores.
Elas continuam independentes, mas encontram oportunidades de cooperação que beneficiam ambas. Essa lógica pode fortalecer o comércio, a indústria e os serviços, levando mais qualidade também a quem consome.
SUA EMPRESA PODE FAZER PARTE DESSA TRANSFORMAÇÃO
O Clube de Negócios Paulista está sendo estruturado para conectar empresários, qualificar serviços, desenvolver pessoas e transformar a união em benefícios concretos.
Queremos uma comunidade em que o conhecimento circule, os profissionais sejam valorizados, as empresas comprem melhor e as oportunidades movimentem a economia da nossa região.
Quanto mais empresários participarem, maior será nossa capacidade de negociar, representar e construir soluções.
Você já faz muita coisa pela sua empresa. Agora imagine o que podemos construir juntos.
Clube de Negócios Paulista. Conectar. Gerar. Fortalecer.
QUERO FAZER PARTE`;

/** Reconstroi o texto na forma em que chegou, a partir do modulo. */
function textoDoModulo(): string {
  const { abertura, proposta, blocos, exemplo, fechamento } = projetoCopy;
  const partes = [abertura, proposta, ...blocos, exemplo, fechamento].flatMap((b) => [
    b.titulo.toUpperCase(),
    ...b.paragrafos,
  ]);
  return [...partes, fechamento.assinatura, fechamento.cta.toUpperCase()].join("\n");
}

describe("texto do projeto", () => {
  it("e exatamente o texto enviado pelo cliente, na ordem", () => {
    expect(textoDoModulo()).toBe(TEXTO_ENVIADO);
  });
});

describe("<ProjetoSection />", () => {
  it("renderiza com o id que o botao do hero usa", () => {
    const { container } = render(<ProjetoSection />);
    expect(container.querySelector("section#projeto")).not.toBeNull();
  });

  it("mostra todos os titulos como cabecalho e todos os paragrafos", () => {
    render(<ProjetoSection />);
    expect(screen.getByRole("heading", { level: 2, name: projetoCopy.abertura.titulo })).toBeTruthy();
    // proposta + oito frentes + exemplo + fechamento
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(projetoCopy.blocos.length + 3);
    for (const bloco of projetoCopy.blocos) {
      for (const p of bloco.paragrafos) expect(screen.getByText(p)).toBeTruthy();
    }
  });

  it("o CTA final leva ao mesmo destino de cadastro do resto da pagina", () => {
    render(<ProjetoSection />);
    const cta = screen.getByRole("link", { name: /Quero fazer parte/ });
    expect(cta.getAttribute("href")).toBe(destinoCadastro);
    expect(screen.getByText(new URL(destinoCadastro).host)).toBeTruthy();
  });

  it("usa somente imagens locais, com alt decorativo nas capas e descritivo nas imagens grandes", () => {
    const { container } = render(<ProjetoSection />);
    const imagens = [...container.querySelectorAll("#projeto img")];

    expect(imagens).toHaveLength(projetoCopy.blocos.length + imagensGrandes.length);
    expect(imagens.every((imagem) => !imagem.getAttribute("src")?.startsWith("http"))).toBe(true);

    const capas = [...container.querySelectorAll(".projetoCardCapa img")];
    expect(capas).toHaveLength(projetoCopy.blocos.length);
    expect(capas.every((capa) => capa.getAttribute("alt") === "")).toBe(true);

    const grandes = [...container.querySelectorAll(".projetoImagemGrande")];
    expect(grandes).toHaveLength(imagensGrandes.length);
    expect(grandes.every((imagem) => Boolean(imagem.getAttribute("alt")?.trim()))).toBe(true);
  });

  it("mantem todas as imagens no public e dentro dos limites de peso", () => {
    const capas = projetoCopy.blocos.map((bloco) => bloco.capa);

    for (const src of [...imagensGrandes, ...capas]) {
      const arquivo = arquivoPublico(src);
      const limite = limitesPorImagem.get(src);
      expect(existsSync(arquivo), `${src} deve existir em public/`).toBe(true);
      expect(limite, `${src} precisa ter limite definido`).toBeDefined();
      expect(statSync(arquivo).size, `${src} excedeu o limite`).toBeLessThanOrEqual(limite!);
    }
  });
});
