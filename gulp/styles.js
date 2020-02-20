/* eslint-env es6 */
'use strict';

/**
 * External dependencies
 */
import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import pump from 'pump';
import { pipeline } from 'mississippi';


/**
 * Internal dependencies
 */
import { paths, gulpPlugins, isProd } from './constants';
import {
	getThemeConfig,
	getStringReplacementTasks,
	logError,
} from './utils';

export function stylesBeforeReplacementStream() {
	// Return a single stream containing all the
	// before replacement functionality
	return pipeline.obj( [
		logError( 'CSS' ),
		gulpPlugins.newer( {
			dest: paths.styles.dest,
			extra: [ paths.config.themeConfig ],
		} ),
	] );
}

export function stylesAfterReplacementStream() {
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
export default function styles( done ) {
	return pump( [
		src( paths.styles.src, { sourcemaps: ! isProd } ),
		stylesBeforeReplacementStream(),
		// Only do string replacements when building for production
		gulpPlugins.if(
			isProd,
			getStringReplacementTasks()
		),
		stylesAfterReplacementStream(),
		dest( paths.styles.dest, { sourcemaps: ! isProd } ),
	], done );
}
