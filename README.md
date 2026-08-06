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

## Atualizacao das noticias

As noticias e indicadores da secao publica sao informativos e nao clicaveis.
A landing esta configurada com `vercel.json` para receber quatro acessos
agendados por dia em producao, nos horarios aproximados de 07h, 11h, 15h e 19h
de Sao Paulo. Esse acesso aquece a pagina e dispara nova busca do painel quando
o cache/revalidate ja expirou.
