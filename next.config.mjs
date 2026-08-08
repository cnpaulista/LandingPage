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
  "img-src 'self' data: blob:",
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
  // A pasta de referencia visual (`CNP Cliente PWA Mobile`) vive ao lado do app.
  // Sem esta raiz explicita o tracing do Next sobe demais e tenta varrer o
  // monorepo inteiro.
  outputFileTracingRoot: __dirname,

  async headers() {
    return [{ source: "/:path*", headers: cabecalhos }];
  },
};

export default nextConfig;
