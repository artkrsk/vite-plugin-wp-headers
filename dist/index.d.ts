import type { Plugin } from 'vite';
import type { HeaderMapping } from '@artemsemkin/wp-headers';
export type { HeaderMapping };
/**
 * Vite plugin that generates WordPress file headers (style.css, plugin PHP)
 * and patches TGM version entries on build and during dev server.
 */
export declare function wpHeaders(mappings: HeaderMapping[]): Plugin;
