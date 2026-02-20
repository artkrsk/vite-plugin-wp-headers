# @artemsemkin/vite-plugin-wp-headers

Vite plugin that generates WordPress file headers from `package.json` data. Wraps [`@artemsemkin/wp-headers`](https://github.com/artkrsk/wp-headers).

## Install

```bash
npm install @artemsemkin/vite-plugin-wp-headers -D
```

## Usage

```ts
// vite.config.ts
import { wpHeaders } from '@artemsemkin/vite-plugin-wp-headers'

export default {
  plugins: [
    wpHeaders([
      {
        type: 'theme',
        slug: 'my-theme',
        entityDir: 'themes/my-theme',
        tgmBasePath: 'themes/my-theme/src/php',
      },
    ]),
  ],
}
```

Runs on `configResolved` (build + dev) and watches `package.json` changes during dev.
