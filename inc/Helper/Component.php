<?php


namespace WP_Rig\WP_Rig\Helper;

use WP_Rig\WP_Rig\Component_Interface;

class Component implements Component_Interface {

	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug() : string {
		return 'helper';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {
	}

	/**
	 * Dump the value and kill the page
	 *
	 */
	public static function dd($val = 'No param was passed, page killed')
	{
		echo '<pre>';
		var_dump($val);
		echo '</pre>';
		wp_die('', 'woof woof!');
	}

	/**
	 * Dump the value without killing the page
	 *
	 */
	public static function vv($val = 'Nothing to see, no param was passed...')
	{
		echo '<pre>';
		var_dump($val);
		echo '</pre>';

	}

	/**
	 * Check environment
	 *
	 * @return boolean
	 */
	public static function is_staging()
	{
		$host = $_SERVER['HTTP_HOST'];
		$url_array = explode('.', $host);
		if (in_array('staging', $url_array)) {
			return true;
		} else {
			return false;
		}
	}

}
