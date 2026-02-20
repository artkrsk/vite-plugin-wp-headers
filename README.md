# @artemsemkin/vite-plugin-wp-headers

Vite plugin that calls a `generate` function on build start and watches specified files for changes during dev. Designed for WordPress header generation but works with any file-generation workflow.

## Install

```bash
npm install @artemsemkin/vite-plugin-wp-headers -D
```

## Why

WordPress themes and plugins need generated header comments in `style.css` and PHP files. These headers should regenerate on every build start and whenever source data (like `package.json`) changes during development. This plugin handles the Vite lifecycle timing — you provide the generation logic.

## API

```ts
wpHeaders({
  generate(): void    // called on build start + file changes during dev
  watch?: string[]    // absolute paths to watch during dev server
}): Plugin
```

## Usage

### With `@artemsemkin/wp-headers`

```ts
import { resolve } from 'node:path'
import { processMapping } from '@artemsemkin/wp-headers'
import { wpHeaders } from '@artemsemkin/vite-plugin-wp-headers'

const mappings = [
  {
    type: 'theme',
    slug: 'my-theme',
    entityDir: resolve(__dirname, 'themes/my-theme'),
  },
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

### Standalone

```ts
import { wpHeaders } from '@artemsemkin/vite-plugin-wp-headers'

export default {
  plugins: [
    wpHeaders({
      generate() {
        // any file-generation logic
      },
      watch: ['/absolute/path/to/source.json'],
    }),
  ],
}
```

## Behavior

- **Build**: `generate()` runs once during `configResolved`
- **Dev server**: `generate()` runs on startup, then again whenever a watched file changes
- Errors during dev are logged via Vite's logger (won't crash the server)
