<?php


namespace WP_Rig\WP_Rig\Header_Code;


use WP_Rig\WP_Rig\Component_Interface;
use WP_Rig\WP_Rig\Helper;

class Component implements Component_Interface {

	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug(): string {
		return 'header-code';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {
		add_action( 'wp_head', [ $this, 'add_header_code' ], 999 );
	}

	public static function add_header_code() {

		//production only functions e.g. analytics to avoid tracking staging site activity
		if ( Helper\Component::is_staging() ) {
			if ( get_field( 'analytics_id', 'option' ) ) {
				$code = get_field( 'analytics_id', 'option' );
				echo <<<HTML
				<script async src="https://www.googletagmanager.com/gtag/js?id={$code}"></script>
				<script>
                    window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', $code);
			</script>
HTML;
			}
		}
	}
}
