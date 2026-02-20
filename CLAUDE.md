# CLAUDE.md

Generic Vite plugin that calls a user-provided `generate()` function at build start and on file changes during dev. No dependency on `@artemsemkin/wp-headers` — composition happens in the consumer's build config.

## Commands

```bash
pnpm build   # tsc -p tsconfig.build.json -> dist/
```

## Architecture

Single file: `src/index.ts`. Exports `wpHeaders(options): Plugin` where options are `{ generate(), watch? }`.
