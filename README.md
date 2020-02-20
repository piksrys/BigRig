<img align="right" width="90" height="90"
     src="https://www.bigdog.ie/wp-content/themes/bb-theme-child/images/bdd-logo.svg"
     title="WP Rig logo by Morten Rand-Hendriksen">
# Big Rig: WordPress Theme Boilerplate for Big Dog Digital
[![Build Status](https://travis-ci.com/wprig/wprig.svg?branch=master)](https://travis-ci.com/wprig/wprig)
[![License: GPL](https://img.shields.io/github/license/wprig/wprig)](https://www.gnu.org/licenses/gpl-3.0.html)
![WP Rig version 2.0.1](https://img.shields.io/badge/version-2.0.1-blue.svg)


Big Rig is based on [WP Rig](https://github.com/wprig/wprig/)

A modified project intended to remove some of the bloat from the WP Rig build process and alter other aspects but maintain that structure and build upon the PHP templating framework.


### Requirements
Big Rig requires the following dependencies. Full installation instructions are provided at their respective websites.

- [PHP](http://php.net/) 7.0
- [npm](https://www.npmjs.com/)
- [Composer](https://getcomposer.org/) (installed globally)

#### [Installation](https://github.com/wprig/wprig#how-to-install-wp-rig)

### Changes from WP Rig
- Modified build process
    - Removed PostCSS support & related styles.
    - Integrated Sass, restructured existing styles to Sass notation
    - Disabled style linting
    - Disabled BrowserSync by default
    - Removed PHP CodeSniff functionality
    - Added dependencyFiles.js to copy required files from node_modules
- Add new production dependencies for structure and commonly used libraries
    - gulp-sass
    - @fortawesome/fontawesome-pro
        - License stored in npmconfig. If this doesn't work contact [support@bigdog.ie](mailto:support@bigdog.ie)
    - bootstrap
        - includes entire library. Stripped back SCSS and no JS used by default
    - slick-carousel
- Removed Custom Header and Custom Background Components
- Add new Components
    - Helper Functions
    - Cleanup Functions
    - Gravity Forms
    - Slick carousel
    - Header Code

For more info on build process see [WP Rig github page](https://github.com/wprig/wprig#how-to-build-wp-rig-for-production) and [wiki](https://github.com/wprig/wprig/wiki)
