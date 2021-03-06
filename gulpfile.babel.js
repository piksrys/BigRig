/* eslint-env es6 */
/* eslint no-undef: "off" */
'use strict';

// External dependencies
import { parallel, series } from 'gulp';

// Internal dependencies
import generateCert from './gulp/generateCert';
import images from './gulp/images';
import php from './gulp/php';
// import {serve} from './gulp/browserSync';
import copyFiles from './gulp/dependencyFiles';
import scripts from './gulp/scripts';
import styles from './gulp/styles';
import editorStyles from './gulp/editorStyles';
import translate from './gulp/translate';
import watch from './gulp/watch';
import prodPrep from './gulp/prodPrep';
import prodStringReplace from './gulp/prodStringReplace';
import prodCompress from './gulp/prodCompress';
import { cleanCSS, cleanJS } from './gulp/clean';

/**
 * Map out the sequence of events on first load and make it the default task
 */
export const firstRun = series(
	cleanCSS, cleanJS, copyFiles, parallel( php, images, series( styles, editorStyles ), scripts ), watch
);

export default firstRun;

/**
 * Build theme for development without BrowserSync or watching
 */
export const buildDev = series( copyFiles, parallel(
	php, images, series( styles, editorStyles ), scripts, translate
) );

/**
 * Export theme for distribution.
 */
export const bundleTheme = series(
	prodPrep, copyFiles, parallel( php, scripts, series( styles, editorStyles ), images ), translate, prodStringReplace, prodCompress
);

/**
 * Export all imported functions as tasks
 */
export { generateCert, php, images, scripts, styles, editorStyles, watch, translate, cleanCSS, cleanJS };
