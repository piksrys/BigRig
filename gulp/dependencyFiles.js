/**
 * External dependencies, copying required files: Fontawesome 5 Pro, Bootstrap, Slick Carousel
 */
import { src, dest} from 'gulp';
import pump from 'pump';
// import { pipeline } from 'mississippi';

/**
 * Internal dependencies
 */
import { paths, gulpPlugins, isProd } from './constants';

export default function copyFiles( done ) {
	return [
		pump( [
			src( paths.bootstrap.styles.src, { sourcemaps: ! isProd } ),
			dest( paths.bootstrap.styles.dest, { sourcemaps: ! isProd } ),
		], done ),
		pump( [
			src( paths.bootstrap.scripts.src, { sourcemaps: ! isProd } ),
			dest( paths.bootstrap.scripts.dest, { sourcemaps: ! isProd } ),
		], done ),
		pump( [
			src( paths.slick.styles.src, { sourcemaps: ! isProd } ),
			dest( paths.slick.styles.dest, { sourcemaps: ! isProd } ),
		], done ),
		pump( [
			src( paths.slick.scripts.src, { sourcemaps: ! isProd } ),
			dest( paths.slick.scripts.dest, { sourcemaps: ! isProd } ),
		], done ),
		pump( [
			src( paths.fontawesome.src, { sourcemaps: ! isProd, 'buffer': true } ),
			dest( paths.fontawesome.dest, { sourcemaps: ! isProd } ),
		], done )
	];

}
