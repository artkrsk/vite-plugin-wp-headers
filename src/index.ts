import type { Plugin } from 'vite'

export interface WpHeadersOptions {
  /** Called on build start and when watched files change */
  generate(): void
  /** Absolute paths to watch during dev */
  watch?: string[]
}

export function wpHeaders(options: WpHeadersOptions): Plugin {
  return {
    name: 'vite-plugin-wp-headers',

    configResolved() {
      options.generate()
    },

    configureServer(server) {
      if (!options.watch?.length) {
        return
      }
      for (const filePath of options.watch) {
        server.watcher.add(filePath)
      }
      server.watcher.on('change', (changedPath: string) => {
        if (!options.watch!.includes(changedPath)) {
          return
        }
        try {
          options.generate()
        } catch (err) {
          server.config.logger.error(String(err))
        }
      })
    },
  }
}
