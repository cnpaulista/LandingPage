import type { Metadata } from "next";
import Link from "next/link";
import "../legal.css";

/*
 * Aviso de Privacidade do CNP Conecta, versao 1.0.0.
 *
 * Regra que este arquivo segue: so afirma o que o sistema FAZ hoje, verificavel
 * no codigo. Mascaramento de documento em log, hash do IP no aceite, exclusao
 * por anonimizacao irreversivel e ausencia de rastreador nao sao promessas de
 * politica — sao comportamento implementado e coberto por teste. Se uma dessas
 * caracteristicas mudar no produto, este texto muda junto, e mudanca de direito
 * ou obrigacao exige versao nova em `legal_documents` (Back).
 */

export const metadata: Metadata = {
  title: "Aviso de Privacidade | CNP Conecta",
  description:
    "Como o CNP Conecta trata dados pessoais: o que coletamos, por que, com quem compartilhamos, por quanto tempo guardamos e como exercer seus direitos.",
};

const VERSAO = "1.0.0";
const VIGENTE_DESDE = "7 de agosto de 2026";

export default function PrivacidadePage() {
  return (
    <main className="legalPage">
      <div className="legalTop">
        <span className="legalBrand">CNP · Clube de Negócios Paulista</span>
        <Link href="/" className="legalBack">
          ← Voltar ao site
        </Link>
      </div>

      <h1>Aviso de Privacidade do CNP Conecta</h1>
      <div className="legalMeta">
        <span>
          <strong>Versão {VERSAO}</strong>
        </span>
        <span>Vigente desde {VIGENTE_DESDE}</span>
      </div>

      <p>
        Este aviso explica o que o CNP Conecta faz com os seus dados pessoais. Ele descreve o
        comportamento real da plataforma, não uma intenção: cada afirmação aqui corresponde a algo
        implementado no sistema.
      </p>

      <h2>1. Quem é o controlador</h2>
      <p>
        <strong>THREE CAPITAL LTDA</strong>, CNPJ 58.536.705/0001-08, com sede na Avenida das
        Nações Unidas, 18801, conj. 1216, Jardim Dom Bosco, São Paulo/SP, CEP 04757-025, é a
        responsável por decidir como e por que seus dados são tratados no CNP Conecta.
      </p>

      <h2>2. Quais dados tratamos</h2>
      <div className="legalTableWrap">
        <table>
          <thead>
            <tr>
              <th>Dado</th>
              <th>De onde vem</th>
              <th>Para que serve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>E-mail e senha</td>
              <td>Você, no cadastro</td>
              <td>Criar e proteger o acesso à sua conta</td>
            </tr>
            <tr>
              <td>Nome, nome de exibição</td>
              <td>Você</td>
              <td>Identificar você para os outros associados</td>
            </tr>
            <tr>
              <td>CPF ou CNPJ</td>
              <td>Você</td>
              <td>
                Garantir que cada pessoa e cada empresa tenham um único perfil, e evitar cadastro
                falso
              </td>
            </tr>
            <tr>
              <td>Foto de perfil</td>
              <td>Você, se quiser enviar</td>
              <td>Apresentação no clube</td>
            </tr>
            <tr>
              <td>Anúncios: título, descrição, imagem</td>
              <td>Você</td>
              <td>Publicar sua oferta no marketplace</td>
            </tr>
            <tr>
              <td>Telefone de contato do anúncio</td>
              <td>Você, com autorização explícita</td>
              <td>
                Permitir que outro associado fale com você. Sem a autorização marcada, o telefone
                não é publicado
              </td>
            </tr>
            <tr>
              <td>Chamados e respostas</td>
              <td>Você e os especialistas</td>
              <td>Atender seu pedido de orientação e manter o histórico</td>
            </tr>
            <tr>
              <td>Aceite dos documentos legais</td>
              <td>Gerado no seu aceite</td>
              <td>
                Provar qual versão você aceitou e quando. Guardamos a data e um{" "}
                <strong>código derivado do seu IP</strong>, nunca o IP em si
              </td>
            </tr>
            <tr>
              <td>Registro de e-mails enviados</td>
              <td>Gerado pelo sistema</td>
              <td>Saber se um aviso importante foi entregue</td>
            </tr>
            <tr>
              <td>Registro de ações administrativas</td>
              <td>Gerado pelo sistema</td>
              <td>Auditoria: quem decidiu o quê, quando e por quê</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="legalCallout legalCalloutInfo">
        <p>
          <strong>Seu CPF ou CNPJ não circula pela plataforma.</strong> Ele é usado para garantir
          perfil único e nunca aparece inteiro: outros associados não o veem, o próprio painel
          administrativo o exibe mascarado, e os registros técnicos do sistema o substituem
          automaticamente antes de gravar qualquer linha de log.
        </p>
      </div>

      <h2>3. Com que base legal tratamos</h2>
      <ul>
        <li>
          <strong>Execução de contrato</strong> (art. 7º, V da LGPD): cadastro, perfil,
          marketplace, chamados e comunicações operacionais — sem esses dados o clube não
          funciona.
        </li>
        <li>
          <strong>Consentimento</strong> (art. 7º, I): publicação do telefone de contato no
          anúncio, que só ocorre se você marcar a autorização, e envio de foto de perfil.
        </li>
        <li>
          <strong>Cumprimento de obrigação legal</strong> (art. 7º, II) e{" "}
          <strong>exercício regular de direitos</strong> (art. 7º, VI): registro de aceites,
          auditoria de decisões e atendimento a pedidos de titulares.
        </li>
        <li>
          <strong>Legítimo interesse</strong> (art. 7º, IX): segurança da plataforma, prevenção a
          fraude e abuso.
        </li>
      </ul>

      <h2>4. Com quem compartilhamos</h2>
      <p>
        Não vendemos seus dados e não os cedemos para publicidade de terceiros. Compartilhamos
        apenas com quem é necessário para o clube funcionar:
      </p>
      <div className="legalTableWrap">
        <table>
          <thead>
            <tr>
              <th>Quem</th>
              <th>Para quê</th>
              <th>Onde ficam os dados</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Supabase</td>
              <td>Banco de dados, autenticação e armazenamento de imagens</td>
              <td>Brasil (São Paulo)</td>
            </tr>
            <tr>
              <td>DigitalOcean</td>
              <td>Servidor que processa as requisições da plataforma</td>
              <td>Estados Unidos</td>
            </tr>
            <tr>
              <td>Netlify</td>
              <td>Entrega das telas do aplicativo ao seu navegador</td>
              <td>Rede global de distribuição</td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Envio dos e-mails operacionais</td>
              <td>Estados Unidos</td>
            </tr>
            <tr>
              <td>Google</td>
              <td>Apenas se você optar por entrar com sua conta Google</td>
              <td>Estados Unidos</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Transferência internacional:</strong> seus dados são armazenados no Brasil, mas
        são <strong>processados nos Estados Unidos</strong>, porque o servidor que atende as
        requisições fica lá. Esse tratamento ocorre com base no art. 33 da LGPD, para execução do
        contrato entre você e o CNP, e os fornecedores acima oferecem cláusulas contratuais de
        proteção de dados.
      </p>
      <p>
        Também compartilhamos dados quando a lei ou uma ordem judicial exigir. O que outros
        associados veem de você é apenas o que aparece no seu perfil público e nos seus anúncios
        aprovados.
      </p>

      <h2>5. Por quanto tempo guardamos</h2>
      <ul>
        <li>
          <strong>Enquanto sua conta existir</strong>, mantemos os dados necessários para o clube
          funcionar.
        </li>
        <li>
          <strong>Registros de aceite</strong> são mantidos enquanto puderem ser necessários como
          prova de consentimento.
        </li>
        <li>
          <strong>Chamados, anúncios e auditoria</strong> permanecem como histórico do clube,
          após a anonimização descrita abaixo.
        </li>
      </ul>

      <h2>6. Exclusão de dados: o que acontece de verdade</h2>
      <p>
        Quando você pede exclusão, o CNP executa uma <strong>anonimização irreversível</strong>.
        Vale a pena entender exatamente o que isso significa, porque não é a mesma coisa que
        apagar tudo:
      </p>
      <h3>O que é removido</h3>
      <ul>
        <li>
          <strong>Seu CPF ou CNPJ é apagado</strong> e substituído pela palavra{" "}
          <code>ANONIMIZADO</code> — o marcador deixa explícito que o dado foi removido a pedido,
          e não que nunca existiu.
        </li>
        <li>
          <strong>Nome, e-mail e telefone são sobrescritos</strong>, inclusive o telefone de
          contato dos seus anúncios. O e-mail vira um endereço em um domínio que nunca existirá,
          para que nenhuma notificação futura possa alcançar quem pediu para sair.
        </li>
      </ul>
      <h3>O que permanece, já sem identificar você</h3>
      <ul>
        <li>chamados e as respostas que os especialistas escreveram;</li>
        <li>anúncios e as decisões de moderação;</li>
        <li>registros de aceite e a trilha de auditoria;</li>
        <li>o próprio registro do seu pedido de exclusão.</li>
      </ul>
      <div className="legalCallout">
        <p>
          <strong>Por que essas linhas não são apagadas.</strong> Seu dado não existe sozinho: um
          chamado contém a resposta de um especialista, e um anúncio pode ter gerado contato com
          outro associado. Apagar as linhas destruiria o histórico de terceiros junto com o seu —
          e destruiria também a prova de que o clube atendeu o seu pedido, que é justamente o que
          sustenta a prestação de contas exigida pela LGPD (art. 6º, X). A lei reconhece a
          retenção de dado anonimizado como desfecho legítimo (art. 16, IV).
        </p>
        <p>
          <strong>A anonimização não tem volta.</strong> Não existe tabela espelho nem chave de
          reversão, porque guardar o &quot;de-para&quot; anularia a própria anonimização. Depois
          de concluída, nem o CNP consegue recuperar quem era você.
        </p>
      </div>
      <p>
        Se preferir apenas parar de usar o clube sem anonimizar, você pode pedir a{" "}
        <strong>desativação</strong> da conta — nesse caso o acesso é encerrado e os dados
        permanecem, até que você peça a exclusão.
      </p>

      <h2>7. Seus direitos</h2>
      <p>A LGPD garante que você possa, a qualquer momento:</p>
      <ul>
        <li>confirmar que tratamos seus dados e acessar quais são;</li>
        <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>pedir anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
        <li>pedir a portabilidade dos seus dados;</li>
        <li>saber com quem compartilhamos seus dados;</li>
        <li>revogar consentimento — por exemplo, tirando o telefone do seu anúncio;</li>
        <li>opor-se a um tratamento e peticionar à ANPD.</li>
      </ul>
      <p>
        <strong>Como exercer:</strong> dentro do aplicativo, na área de privacidade, ou pelo
        e-mail na seção de contato abaixo. Todo pedido entra em uma fila com prazo visível para
        quem atende, e a resposta é registrada por escrito — concluir ou recusar um pedido{" "}
        <strong>exige justificativa</strong>, que é o texto que chega até você.
      </p>

      <h2>8. Como protegemos seus dados</h2>
      <ul>
        <li>
          <strong>Conexões criptografadas</strong> entre seu navegador, a plataforma e o banco.
        </li>
        <li>
          <strong>Isolamento por usuário no próprio banco</strong>: as regras de acesso vivem na
          camada de dados, não apenas na aplicação — uma falha no código não expõe dado de outro
          associado.
        </li>
        <li>
          <strong>Documentos mascarados nos registros técnicos</strong>: CPF e CNPJ são
          substituídos automaticamente antes de qualquer linha de log ser gravada.
        </li>
        <li>
          <strong>IP do aceite guardado como código irreversível</strong>, nunca em claro.
        </li>
        <li>
          <strong>Acesso administrativo por papel</strong>, com registro de quem fez o quê. Nem
          quem administra o clube enxerga seu documento inteiro.
        </li>
      </ul>
      <p>
        Nenhum sistema é imune a incidentes. Se ocorrer um incidente de segurança relevante,
        comunicaremos você e a ANPD conforme o art. 48 da LGPD.
      </p>

      <h2>9. Cookies e armazenamento no navegador</h2>
      <p>
        <strong>O CNP Conecta não usa cookies de rastreamento, publicidade ou analytics.</strong>{" "}
        Não há Google Analytics, pixel de rede social ou ferramenta de gravação de sessão neste
        site nem no aplicativo.
      </p>
      <p>
        O que existe é o armazenamento local que mantém você conectado entre uma tela e outra —
        sem ele, você teria que fazer login a cada clique. Limpar os dados do navegador encerra a
        sessão.
      </p>

      <h2>10. Menores de idade</h2>
      <p>
        O CNP Conecta é destinado a maiores de 18 anos e não trata dados de crianças e
        adolescentes de forma intencional. Se identificarmos um cadastro nessa condição, a conta é
        encerrada e os dados, eliminados.
      </p>

      <h2>11. Mudanças neste aviso</h2>
      <p>
        Este aviso é <strong>versionado</strong>. Mudanças que alterem o que tratamos, por quê,
        com quem compartilhamos, por quanto tempo guardamos ou quais são seus direitos geram uma{" "}
        <strong>versão nova, com novo aceite pedido antes de você continuar usando o clube</strong>
        . Ajustes de redação e atualização de dados de contato não geram versão nova.
      </p>

      <h2>12. Contato do encarregado de dados</h2>
      <div className="legalContact">
        <p>
          Para exercer seus direitos ou tirar dúvidas sobre este aviso:
          <br />
          E-mail: <a href="mailto:privacidade.cnp@outlook.com">privacidade.cnp@outlook.com</a>
        </p>
        <p>
          <strong>THREE CAPITAL LTDA</strong> — CNPJ 58.536.705/0001-08
          <br />
          Avenida das Nações Unidas, 18801, conj. 1216 — Jardim Dom Bosco — São Paulo/SP — CEP
          04757-025
        </p>
        <p className="legalNote">
          Os dados de contato desta seção podem ser atualizados sem que isso mude a versão do
          documento — canal de atendimento é informação de contato, não cláusula. A versão vigente
          continua sendo a indicada no topo desta página.
        </p>
      </div>

      <div className="legalFooter">
        <Link href="/termos">Termos de Uso</Link>
        <Link href="/">Início</Link>
      </div>
    </main>
  );
}
