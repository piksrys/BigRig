/**
 * External dependencies
 */
import { src, dest, series } from 'gulp';
import pump from 'pump';
// import { pipeline } from 'mississippi';

/**
 * Internal dependencies
 */
import { paths, gulpPlugins, isProd } from './constants';
// import { getStringReplacementTasks } from "./utils";
// import { stylesAfterReplacementStream, stylesBeforeReplacementStream } from "./styles";

//
// export default function bootstrapScripts( done ) {
// 	return pump( [
// 		src( paths.bootstrap.scripts.src, { sourcemaps: ! isProd } ),
// 		dest( paths.bootstrap.scripts.dest, { sourcemaps: ! isProd } ),
// 	], done );
// }

export default function bootstrap( done ) {
	return [
		pump( [
			src( paths.bootstrap.styles.src, { sourcemaps: ! isProd } ),
			dest( paths.bootstrap.styles.dest, { sourcemaps: ! isProd } ),
		], done ),
		pump( [
			src( paths.bootstrap.scripts.src, { sourcemaps: ! isProd } ),
			dest( paths.bootstrap.scripts.dest, { sourcemaps: ! isProd } ),
		], done )
	];

}
