<?php

/*
 * functions for Advanced Custom Fields
 */

namespace WP_Rig\WP_Rig\ACF;


use WP_Rig\WP_Rig\Component_Interface;
use function add_action;
use function acf_add_options_page;

class Component implements Component_Interface {

	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug(): string {
		return 'acf';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {
		add_action( 'admin_menu', [$this, 'add_admin_pages'], 20 );
		add_action( 'acf/init', [$this, 'acf_maps_key'] );
	}

	/**
	 * Add Theme Options Page
	 *
	 * @return void
	 */
	static public function add_admin_pages() {
		if ( function_exists( 'acf_add_options_page' ) ) {

			acf_add_options_page( array(
				'page_title' => 'Company Information',
				'menu_title' => 'Company Information',
				'menu_slug'  => 'company-info',
				'capability' => 'manage_options',
				'redirect'   => false,
				'icon_url'   => 'dashicons-info',
				'position'   => 20
			) );

		}

		acf_add_options_page( array(
			'page_title' => 'Theme Settings',
			'menu_title' => 'Theme Settings',
			'menu_slug'  => 'theme-settings',
			'capability' => 'manage_options',
			'redirect'   => false,
			'icon_url'   => 'dashicons-admin-site-alt',
			'position'   => 21
		) );
	}


	/**
	 * Add Google Maps API Key to Advanced Custom Fields
	 *
	 * @return void
	 */
	public static function acf_maps_key() {

		if ( get_field( 'maps_api_key', 'option' ) ) {
			acf_update_setting( 'google_api_key', get_field( 'maps_api_key', 'option' ) );
		}
	}

}
