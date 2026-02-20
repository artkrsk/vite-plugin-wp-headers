# @artemsemkin/vite-plugin-wp-headers

Vite plugin that automates file generation during the build lifecycle. Runs a callback on every build start and re-runs it when watched files change during dev — no manual scripts, no forgotten rebuilds.

## Install

```bash
npm install @artemsemkin/vite-plugin-wp-headers -D
```

## Why

Build systems often need to generate or update files before bundling starts — WordPress header comments from `package.json`, version stamps, license blocks, etc. Without automation, you either forget to regenerate or add a manual pre-build step that breaks when someone skips it.

This plugin hooks into Vite's lifecycle so generation happens automatically:
- On every `vite build` invocation
- On dev server startup
- On every change to watched source files during dev

You provide the generation logic. The plugin handles when it runs.

## API

```ts
wpHeaders({
  generate(): void    // called on build start + file changes during dev
  watch?: string[]    // absolute paths to watch during dev server
}): Plugin
```

## Examples

### WordPress headers from `package.json`

Pair with [`@artemsemkin/wp-headers`](https://www.npmjs.com/package/@artemsemkin/wp-headers) to generate `style.css` headers, plugin PHP headers, and `readme.txt` blocks from `package.json` data:

```ts
// vite.config.ts
import { resolve } from 'node:path'
import { processMapping } from '@artemsemkin/wp-headers'
import { wpHeaders } from '@artemsemkin/vite-plugin-wp-headers'

const themeDir = resolve(__dirname, 'themes/flavor')
const pluginDir = resolve(__dirname, 'plugins/flavor-core')

const mappings = [
  { type: 'theme', slug: 'flavor', entityDir: themeDir, tgmBasePath: resolve(themeDir, 'src/php') },
  { type: 'plugin', slug: 'flavor-core', entityDir: pluginDir, tgmBasePath: resolve(themeDir, 'src/php') },
]

export default {
  plugins: [
    wpHeaders({
      generate() {
        for (const m of mappings) {
          processMapping(m)
        }
      },
      watch: mappings.map((m) => resolve(m.entityDir, 'package.json')),
    }),
  ],
}
```

Change any `package.json` version field during dev → headers regenerate instantly.

### Any file generation

Works with any generation logic — not limited to WordPress:

```ts
import { writeFileSync } from 'node:fs'
import { wpHeaders } from '@artemsemkin/vite-plugin-wp-headers'

export default {
  plugins: [
    wpHeaders({
      generate() {
        writeFileSync('src/version.ts', `export const VERSION = '${Date.now()}'`)
      },
    }),
  ],
}
```

## Behavior

- **Build**: `generate()` runs once during `configResolved`
- **Dev server**: `generate()` runs on startup, then again whenever a watched file changes
- Errors during dev are logged via Vite's logger (won't crash the server)
