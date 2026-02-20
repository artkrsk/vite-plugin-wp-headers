import { resolve } from 'node:path';
import { processMapping } from '@artemsemkin/wp-headers';
/**
 * Vite plugin that generates WordPress file headers (style.css, plugin PHP)
 * and patches TGM version entries on build and during dev server.
 */
export function wpHeaders(mappings) {
    return {
        name: 'vite-plugin-wp-headers',
        configResolved() {
            for (const mapping of mappings) {
                processMapping(mapping);
            }
        },
        configureServer(server) {
            for (const mapping of mappings) {
                const pkgPath = resolve(mapping.entityDir, 'package.json');
                server.watcher.add(pkgPath);
                server.watcher.on('change', (filePath) => {
                    if (filePath !== pkgPath) {
                        return;
                    }
                    try {
                        processMapping(mapping);
                    }
                    catch (err) {
                        server.config.logger.error(String(err));
                    }
                });
            }
        },
    };
}
