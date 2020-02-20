<?php

/**
 * Class for augmenting Gravity Forms functionality
 *
 * @class FLChildTheme
 */

namespace WP_Rig\WP_Rig\Forms;

use WP_Rig\WP_Rig\Component_Interface;
use function add_action;
use function add_filter;
use GFAPI;

class Component implements Component_Interface {


	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug() : string {
		return 'forms';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {

		add_filter( 'gform_pre_render', [$this, 'print_form_styles'], 15 );
		add_filter( 'gform_submit_button', [$this, 'form_submit_button'], 10, 2 );
	}

	/// CURRENCY SYMBOL PLACEMENT

	public static function modify_currencies( $currencies ) {
		$currencies['EUR'] = array(
			'name'               => esc_html__( 'Euro', 'gravityforms' ),
			'symbol_left'        => '&#8364;',
			'symbol_right'       => '',
			'symbol_padding'     => '',
			'thousand_separator' => ',',
			'decimal_separator'  => '.',
			'decimals'           => 2
		);

		return $currencies;
	}

	// Get string between two selected strings.
	// Used for maintaining the custom Submit button text when editing the markup below but can be used in a more general sense if needed
	protected static function get_string_between( $string, $start, $end ) {
		$string = ' ' . $string;
		$ini    = strpos( $string, $start );
		if ( $ini == 0 ) {
			return '';
		}
		$ini += strlen( $start );
		$len = strpos( $string, $end, $ini ) - $ini;

		return substr( $string, $ini, $len );

	}

	/**
	 *  Adds Bd button classes to Gravity Form Submit
	 *  Comment conditional statements and add form IDs if different classes are to be added to different forms
	 */
	static public function form_submit_button( $button, $form ) {
		$value = self::get_string_between( $button, "value='", "'" );

		$button = str_replace( 'gform_button button', 'gform_button bd-btn bd-btn-two', $button );
		$button = str_replace( '<input', '<button', $button );
		$button .= $value . '</button>';

		return $button;
	}

	public static function form_next_button( $button, $form ) {
		$value  = self::get_string_between( $button, "value='", "'" );
		$button = str_replace( 'gform_next_button button', 'gform_next_button bd-btn bd-btn-two', $button );
		$button = str_replace( '<input', '<button', $button );
		$button .= $value . '</button>';

		return $button;
	}

	public static function form_previous_button( $button, $form ) {
		$value  = self::get_string_between( $button, "value='", "'" );
		$button = str_replace( 'gform_previous_button button', 'gform_previous_button', $button );
		$button = str_replace( '<input', '<button', $button );
		$button .= $value . '</button>';

		return $button;
	}

	//output the sass generated stylesheet specific to Gravity Forms
	public static function print_form_styles( $form ) {
		wp_print_styles( array( 'wp-rig-forms' ) );

		return $form;
	}

}
