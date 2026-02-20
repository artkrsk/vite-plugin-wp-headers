# CLAUDE.md

Vite plugin wrapper for `@artemsemkin/wp-headers`. Runs `processMapping()` on `configResolved` and watches `package.json` changes during dev server.

## Commands

```bash
pnpm build   # tsc -p tsconfig.build.json -> dist/
```

## Architecture

Single file: `src/index.ts`. Exports `wpHeaders(mappings): Plugin` and re-exports `HeaderMapping` type from `@artemsemkin/wp-headers`.
