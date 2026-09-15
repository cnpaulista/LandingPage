import type { Metadata } from "next";
import Link from "next/link";
import "../legal.css";

/*
 * Termos de Uso do CNP Conecta, versao 1.0.0.
 *
 * A versao aqui e a mesma gravada em `legal_documents` no Back
 * (migration 20260807002200). Mudar o texto de forma que altere DIREITOS ou
 * OBRIGACOES exige publicar uma versao nova la e aqui — o Back cobra o aceite
 * da versao vigente e o associado e levado a esta pagina antes de usar o clube.
 *
 * A secao de contato e a excecao declarada: dado de contato pode mudar sem
 * versao nova, porque nao e clausula. Ver comentario na propria secao.
 */

export const metadata: Metadata = {
  // `absolute`: sem ele o template do layout acrescentaria o nome do clube
  // depois de "CNP Conecta".
  title: { absolute: "Termos de Uso | CNP Conecta" },
  alternates: { canonical: "/termos" },
  description:
    "Termos de Uso do CNP Conecta, o clube de negocios que conecta empresarios e da acesso a especialistas.",
};

const VERSAO = "1.0.0";
const VIGENTE_DESDE = "7 de agosto de 2026";

export default function TermosPage() {
  return (
    <main className="legalPage">
      <div className="legalTop">
        <span className="legalBrand">CNP · Clube de Negócios Paulista</span>
        <Link href="/" className="legalBack">
          ← Voltar ao site
        </Link>
      </div>

      <h1>Termos de Uso do CNP Conecta</h1>
      <div className="legalMeta">
        <span>
          <strong>Versão {VERSAO}</strong>
        </span>
        <span>Vigente desde {VIGENTE_DESDE}</span>
      </div>

      <p>
        Este documento explica as regras para participar do CNP Conecta. Ao criar uma conta e
        aceitar estes termos, você concorda com o que está escrito aqui. Se não concordar com
        alguma parte, não crie a conta — e, se quiser conversar antes, fale com a gente pelos
        canais no fim desta página.
      </p>

      <h2>1. Quem oferece o serviço</h2>
      <p>
        O CNP Conecta é operado por <strong>THREE CAPITAL LTDA</strong>, inscrita no CNPJ sob o
        nº 58.536.705/0001-08, com sede na Avenida das Nações Unidas, 18801, conjunto 1216,
        Jardim Dom Bosco, São Paulo/SP, CEP 04757-025. Ao longo deste documento, chamamos essa
        empresa de <strong>CNP</strong> e você de <strong>associado</strong>.
      </p>

      <h2>2. O que o CNP Conecta é</h2>
      <p>
        O CNP Conecta é um clube de negócios: uma plataforma onde empresários se apresentam,
        encontram outros empresários e acessam especialistas em áreas como jurídico, contábil,
        financeiro, sanitário e marketing. O clube oferece hoje:
      </p>
      <ul>
        <li>
          <strong>Perfil de associado</strong>, como pessoa física, como empresa, ou os dois.
        </li>
        <li>
          <strong>Marketplace</strong>, onde você publica o que oferece e vê o que outros
          associados oferecem.
        </li>
        <li>
          <strong>Chamados</strong>, um canal para pedir orientação e ser atendido por um
          especialista.
        </li>
      </ul>

      <div className="legalCallout">
        <p>
          <strong>O CNP não é parte nos negócios fechados entre associados.</strong> O clube
          apresenta pessoas e organiza o ambiente onde elas se encontram. Contratos, pagamentos,
          prazos, qualidade e eventuais disputas são entre você e a outra parte. O CNP não
          garante que um negócio será fechado, não responde por obrigações assumidas entre
          associados e não recebe comissão sobre esses negócios.
        </p>
        <p>
          O mesmo vale para os especialistas: eles são profissionais selecionados pelo clube para
          orientar, mas qualquer contratação entre você e o especialista é uma relação entre
          vocês dois.
        </p>
      </div>

      <h2>3. Quem pode participar</h2>
      <ul>
        <li>Pessoas com 18 anos ou mais.</li>
        <li>
          Empresários, sócios, profissionais autônomos e representantes de empresas, com dados
          verdadeiros.
        </li>
        <li>
          <strong>Um perfil por CPF e um perfil por CNPJ.</strong> A mesma pessoa pode ter um
          perfil de pessoa física e um de empresa, e alternar entre eles. Não é permitido criar
          mais de um perfil para o mesmo documento.
        </li>
      </ul>
      <p>
        Você é responsável pela veracidade do que informa e por manter seus dados atualizados.
        Cadastro com documento de terceiro, dado falso ou empresa que você não representa é
        motivo de encerramento imediato.
      </p>

      <h2>4. Sua conta</h2>
      <p>
        O acesso é pessoal. Guarde sua senha e não compartilhe o acesso — o que for feito pela
        sua conta é atribuído a você. Se suspeitar de uso indevido, avise imediatamente pelos
        canais no fim desta página.
      </p>

      <h2>5. Plano e cobrança</h2>
      <p>
        Nesta fase, o CNP Conecta tem um <strong>plano único e gratuito</strong>, chamado{" "}
        <strong>CNP Conecta</strong>. Não há cobrança pelo uso da plataforma, e ela não processa
        pagamentos entre associados. Quais funcionalidades ficam disponíveis é definido pelo
        plano e pode mudar conforme o clube evolui.
      </p>
      <p>
        Se um dia houver plano pago, isso será comunicado antes, e nenhum valor será cobrado sem
        contratação explícita sua.
      </p>

      <h2>6. Marketplace: o que você publica</h2>
      <p>
        Ao publicar um anúncio, você declara que tem o direito de oferecer aquilo e que as
        informações são verdadeiras. Todo anúncio passa por <strong>moderação</strong> antes de
        aparecer para os outros associados.
      </p>
      <ul>
        <li>
          <strong>Aprovação:</strong> o anúncio passa a aparecer no marketplace.
        </li>
        <li>
          <strong>Reprovação:</strong> você recebe o motivo por escrito e pode corrigir e
          republicar. Reprovamos anúncios com informação falsa, conteúdo ilegal, discriminatório,
          ofensivo, dado de terceiro sem autorização, ou fora da proposta do clube.
        </li>
      </ul>
      <p>
        <strong>O telefone de contato só aparece se você marcar que autoriza.</strong> Sem essa
        autorização explícita, o anúncio é publicado sem o telefone.
      </p>

      <h2>7. Chamados</h2>
      <p>
        Os chamados são um canal de orientação, não um serviço de urgência nem substituto de
        contratação profissional formal. Descreva seu caso com clareza e evite incluir dados
        sensíveis que não sejam necessários. Você pode encerrar seu próprio chamado quando
        considerar resolvido, sem precisar justificar.
      </p>

      <h2>8. Conduta</h2>
      <p>Dentro do clube, não é permitido:</p>
      <ul>
        <li>usar a plataforma para fraude, golpe, pirâmide ou qualquer atividade ilegal;</li>
        <li>
          coletar dados de outros associados para vender, alimentar lista de disparo ou uso fora
          do clube;
        </li>
        <li>enviar spam, corrente ou oferta em massa não solicitada;</li>
        <li>publicar conteúdo ofensivo, discriminatório, difamatório ou que viole direitos;</li>
        <li>
          tentar burlar controles de acesso, sobrecarregar a plataforma ou acessar dados que não
          são seus.
        </li>
      </ul>

      <h2>9. Suspensão e encerramento</h2>
      <p>
        O CNP pode suspender ou encerrar o acesso de quem descumprir estes termos, com aviso do
        motivo. Você pode sair quando quiser, pedindo a exclusão da conta — e como isso funciona,
        incluindo o que é apagado e o que permanece, está detalhado no{" "}
        <Link href="/privacidade">Aviso de Privacidade</Link>.
      </p>

      <h2>10. Conteúdo e propriedade intelectual</h2>
      <p>
        A marca CNP, o site, a plataforma e seus textos e imagens pertencem ao CNP. O conteúdo
        que você publica continua seu; ao publicá-lo, você autoriza o clube a exibi-lo dentro da
        plataforma para os fins descritos aqui.
      </p>

      <h2>11. Comunicações</h2>
      <p>
        Usamos e-mail para o que é operacional: confirmação de cadastro, recuperação de senha,
        andamento de chamado e resultado de moderação de anúncio. Esses avisos fazem parte do
        funcionamento do clube e não são publicidade.
      </p>

      <h2>12. Disponibilidade</h2>
      <p>
        Trabalhamos para manter a plataforma no ar, mas ela pode ficar indisponível por
        manutenção, falha técnica ou causa fora do nosso controle. O serviço é oferecido no
        estado em que se encontra, e o clube está em evolução: funcionalidades podem ser
        adicionadas, alteradas ou removidas.
      </p>

      <h2>13. Mudanças nestes termos</h2>
      <p>
        Estes termos são <strong>versionados</strong>. Se mudarmos algo que altere seus direitos
        ou obrigações, publicamos uma versão nova e{" "}
        <strong>pedimos seu aceite antes de você continuar usando o clube</strong> — o registro
        guarda qual versão você aceitou e quando. Correções de redação e atualização de dados de
        contato não geram versão nova.
      </p>

      <h2>14. Lei aplicável</h2>
      <p>
        Estes termos são regidos pela lei brasileira. Fica eleito o foro da Comarca de São
        Paulo/SP para resolver questões deste documento, sem prejuízo do direito do consumidor de
        acionar o foro do seu domicílio quando a lei assim permitir.
      </p>

      <h2>15. Contato</h2>
      <div className="legalContact">
        <p>
          <strong>THREE CAPITAL LTDA</strong> — CNPJ 58.536.705/0001-08
          <br />
          Avenida das Nações Unidas, 18801, conj. 1216 — Jardim Dom Bosco — São Paulo/SP — CEP
          04757-025
          <br />
          E-mail: <a href="mailto:suporte.cnp@outlook.com">suporte.cnp@outlook.com</a>
        </p>
        <p className="legalNote">
          Os dados de contato desta seção podem ser atualizados sem que isso mude a versão do
          documento — endereço de atendimento é informação de contato, não cláusula.
        </p>
      </div>

      <div className="legalFooter">
        <Link href="/privacidade">Aviso de Privacidade</Link>
        <Link href="/">Início</Link>
      </div>
    </main>
  );
}
