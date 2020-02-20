/* eslint-env es6 */
'use strict';

/*
This is a basis for any future work with font files. For now it just copies the Font Awesome Pro files from node into the assets directory
 */


/**
 * External dependencies
 */
import { src, dest } from 'gulp';
import pump from 'pump';
// import { pipeline } from 'mississippi';

/**
 * Internal dependencies
 */
import { paths, gulpPlugins, isProd } from './constants';
// import { getStringReplacementTasks } from "./utils";
// import { stylesAfterReplacementStream, stylesBeforeReplacementStream } from "./styles";


/**
 * Generate font files.
 */
// export function fonts() {
// 	return gulp.src(paths.fonts.src)
// 		.pipe(newer(paths.fonts.dest))
// 		.pipe(gulp.dest(paths.fonts.dest));
// }

export default function fonts( done ) {
	return pump( [
		src( paths.fontawesome.src, { sourcemaps: ! isProd, 'buffer': true } ),
		dest( paths.fontawesome.dest, { sourcemaps: ! isProd } ),
	], done );
}
