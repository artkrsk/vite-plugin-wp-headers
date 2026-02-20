export function wpHeaders(options) {
    return {
        name: 'vite-plugin-wp-headers',
        configResolved() {
            options.generate();
        },
        configureServer(server) {
            if (!options.watch?.length) {
                return;
            }
            for (const filePath of options.watch) {
                server.watcher.add(filePath);
            }
            server.watcher.on('change', (changedPath) => {
                if (!options.watch.includes(changedPath)) {
                    return;
                }
                try {
                    options.generate();
                }
                catch (err) {
                    server.config.logger.error(String(err));
                }
            });
        },
    };
}
