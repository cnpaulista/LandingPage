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

Essa URL aponta para o Back dedicado do CNP. Quando vazia, a landing usa a rota
server-side interna `/api/market-panel`, que agrega as fontes publicas com cache
e evita que a pagina fique dependente de manutencao manual.
