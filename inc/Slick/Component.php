<?php

/**
 * Class for augmenting Gravity Forms functionality
 *
 * @class FLChildTheme
 */

namespace WP_Rig\WP_Rig\Slick;

use WP_Rig\WP_Rig\Component_Interface;
use WP_Rig\WP_Rig\Templating_Component_Interface;
use function add_action;
use function WP_Rig\WP_Rig\wp_rig;

class Component implements Component_Interface, Templating_Component_Interface {


	static $slick_active = false;
	static $using_slick_theme_styles = false;

	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug(): string {
		return 'slick';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {
		add_action( 'wp_enqueue_scripts', [ $this, 'register_slick_js' ] );
	}

	/**
	 * Gets template tags to expose as methods on the Template_Tags class instance, accessible through `wp_rig()`.
	 *
	 * @return array Associative array of $method_name => $callback_info pairs. Each $callback_info must either be
	 *               a callable or an array with key 'callable'. This approach is used to reserve the possibility of
	 *               adding support for further arguments in the future.
	 */
	public function template_tags(): array {
		return [
			'slick_slider_active' => [ $this, 'slick_slider_active' ],
			'using_slick_theme_styles' => [ $this, 'using_slick_theme_styles' ],
		];
	}


	/*
	 * set the CSS preload variables and print the styles & scripts for the slider
	 * $theme_styles = bool : Decide whether to use to accompanying slick-theme.css or just basic styles
	 */
	public static function slick_init($theme_styles = false) {


		wp_print_styles( array( 'wp-rig-slick' ) );


		if ($theme_styles) {
			$using_slick_theme_styles = true;
			wp_print_styles( array( 'wp-rig-slick-theme' ) );
		}

		wp_print_scripts( array( 'wp-rig-slick' ) );

		$slick_active = true;
	}


	/*
	 * Sets the template tag used to preload slick CSS
	 */

	public function slick_slider_active() {
		return $this->slick;
	}

	public function using_slick_theme_styles() {
		return $this->using_slick_theme_styles;
	}

	/**
	 * Enqueues JavaScript to make Customizer preview reload changes asynchronously.
	 */
	public function register_slick_js() {
		wp_enqueue_script( 'jquery' );
		wp_register_script(
			'wp-rig-slick',
			get_theme_file_uri( '/assets/js/libs/slick/slick.min.js' ),
			[ 'jquery' ],
			wp_rig()->get_asset_version( get_theme_file_path( '/assets/js/libs/slick/slick.min.js' ) ),
			true
		);
	}
}
