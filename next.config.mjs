import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * SPEC-006:TASK-003 / REQ-003 - cabecalhos de seguranca.
 *
 * A politica aqui e a mais fechada dos tres apps, e pode ser: a landing nao faz
 * NENHUMA chamada externa a partir do navegador. O painel de noticias e
 * indicadores e buscado no servidor, em componente de servidor, e chega ao
 * usuario ja renderizado — entao `connect-src 'self'` basta.
 *
 * As paginas legais (`/termos` e `/privacidade`) vivem neste app, e sao o
 * documento que o associado e obrigado a aceitar. Enquadrar uma delas em outro
 * site para exibir texto diferente do que foi aceito e exatamente o que
 * `frame-ancestors 'none'` impede.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  /*
   * SPEC-018 / D-018-04 - os dois hosts de imagem de fonte PUBLICA.
   *
   * A lista e a mesma do Back (`IMAGE_HOSTS_PERMITIDOS`), e as duas precisam
   * concordar: o Back decide qual `imageUrl` sai no payload, e a CSP decide
   * qual o navegador aceita carregar. Divergir entre elas produz o pior dos
   * dois mundos — imagem que chega no JSON e nao renderiza, sem erro visivel.
   *
   * G1 entrou por D-018-05: sem miniatura, o layout de portal pedido para o
   * celular ficaria com buraco na maioria dos itens. UOL segue de fora — o
   * feed dele nao traz imagem em item nenhum, entao nao ha o que liberar.
   */
  "img-src 'self' data: blob: https://imagens.ebc.com.br https://noticias.stf.jus.br https://s2-g1.glbimg.com",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const seguranca = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// So em producao: em desenvolvimento o HMR do Next usa `eval` e websocket local,
// e uma politica de producao quebraria `pnpm dev`.
const cabecalhos =
  process.env.NODE_ENV === "production"
    ? [...seguranca, { key: "Content-Security-Policy", value: csp }]
    : seguranca;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * SPEC-018 - sem isto, `next/image` recusa host externo com erro de build.
   * Os hosts sao os mesmos da CSP acima e os mesmos do Back; tres listas que
   * precisam concordar, e o comentario existe para a proxima pessoa achar as
   * outras duas.
   */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imagens.ebc.com.br" },
      { protocol: "https", hostname: "noticias.stf.jus.br" },
      // D-018-05 - liberado para o layout de portal ter miniatura.
      { protocol: "https", hostname: "s2-g1.glbimg.com" },
    ],
  },
  // A pasta de referencia visual (`CNP Cliente PWA Mobile`) vive ao lado do app.
  // Sem esta raiz explicita o tracing do Next sobe demais e tenta varrer o
  // monorepo inteiro.
  outputFileTracingRoot: __dirname,

  async headers() {
    return [{ source: "/:path*", headers: cabecalhos }];
  },
};

export default nextConfig;
