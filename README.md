# CNP - Landing Page

Landing page institucional do CNP - Clube de Negócios Paulista.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Servidor local padrão:

```text
http://localhost:3000
```

## Validação

```bash
pnpm build
```

## Observação

Ao validar, pare o `pnpm dev` antes de rodar `pnpm build` e depois inicie o servidor novamente. Isso evita cache inconsistente do Next em ambiente local.

## Variaveis

```text
NEXT_PUBLIC_CNP_API_BASE_URL=
```

Essa URL aponta para o Back do CNP. Quando vazia em ambiente local, a landing
mantem o painel de noticias e indicadores em estado de fallback para nao quebrar
o build.
