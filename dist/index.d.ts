import type { Plugin } from 'vite';
export interface WpHeadersOptions {
    /** Called on build start and when watched files change */
    generate(): void;
    /** Absolute paths to watch during dev */
    watch?: string[];
}
export declare function wpHeaders(options: WpHeadersOptions): Plugin;
