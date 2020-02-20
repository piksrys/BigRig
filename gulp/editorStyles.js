/* eslint-env es6 */
'use strict';

/**
 * External dependencies
 */
import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import pump from 'pump';
import stylelint from 'stylelint';
import { pipeline } from 'mississippi';

/**
 * Internal dependencies
 */
import { rootPath, paths, gulpPlugins, isProd } from './constants';
import {
	getThemeConfig,
	getStringReplacementTasks,
	logError,
} from './utils';

export function editorStylesBeforeReplacementStream() {
	// Return a single stream containing all the
	// before replacement functionality
	return pipeline.obj( [
		logError( 'Editor CSS' ),
		gulpPlugins.newer( {
			dest: paths.styles.dest,
			extra: [ paths.config.themeConfig ],
		} ),
	] );
}

export function editorStylesAfterReplacementStream() {
	const config = getThemeConfig();

	const sassOptions = { outputStyle: 'compressed' };
	// Skip minifying files if we aren't building for
	// production and debug is enabled
	if ( config.dev.debug.styles && ! isProd ) {
		// postcssPlugins.pop();
		sassOptions.outputStyle = 'nested';
	}

	// Report messages from other postcss plugins
	// postcssPlugins.push(
	// reporter( { clearReportedMessages: true } )
	// );

	// Return a single stream containing all the
	// after replacement functionality
	return pipeline.obj( [
		sass( sassOptions ).on('error', sass.logError),
		gulpPlugins.if(
			config.dev.debug.styles,
			gulpPlugins.tabify( 2, true )
		),
		gulpPlugins.rename( {
			suffix: '.min',
		} ),
		// server.stream( { match: '**/*.css' } ),
	] );
}

/**
* CSS via PostCSS + CSSNext (includes Autoprefixer by default).
* @param {function} done function to call when async processes finish
* @return {Stream} single stream
*/
export default function editorStyles( done ) {
	return pump( [
		src( paths.styles.editorSrc, { sourcemaps: ! isProd } ),
		editorStylesBeforeReplacementStream(),
		// Only do string replacements when building for production
		gulpPlugins.if(
			isProd,
			getStringReplacementTasks()
		),
		editorStylesAfterReplacementStream(),
		dest( paths.styles.editorDest, { sourcemaps: ! isProd } ),
	], done );
}
