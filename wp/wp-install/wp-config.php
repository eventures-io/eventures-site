<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
 
 define('ENVIRONMENT', getenv('WP_ENV'));


// Global DB config
if (ENVIRONMENT == 'production'){
//	$mysql_host = getenv('WPDB_TCP_ADDR');
		define('DB_NAME', 'wp_eventures');
		define('DB_USER', 'wp-evtrs');
	    define('DB_PASSWORD', 'mSnet763*.');
        define('DB_HOST', 'wp_db');
}else{
	// Include local configuration
	if (file_exists(dirname(__FILE__) . '/local-config.php')) {
	include(dirname(__FILE__) . '/local-config.php');
	}
	define('WP_DEBUG', true);
	error_log('Connecting to local db');
	define('DB_NAME', 'cdws');
	define('DB_USER', 'cdws');
	define('DB_PASSWORD', 'cdws');
    define('DB_HOST', 'localhost');
}
/** Database Charset to use in creating database tables. */
if (!defined('DB_CHARSET')) {
	define('DB_CHARSET', 'utf8');
}

/** The Database Collate type. Don't change this if in doubt. */
if (!defined('DB_COLLATE')) {
	define('DB_COLLATE', '');
}

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '~@8a4n8[q+;beAHA&M5R%d|NR#I~qgBr3<M0gA<|?z`gDOnr|3=mS{&zeEi`~-]W');
define('SECURE_AUTH_KEY',  ']]h}tNdUAH@o)xuzIzzzc-Cij(1w/pG8d^+t.:i>JvJ|GD_5V7QGa=asD)(ah]8H');
define('LOGGED_IN_KEY',    'dM+v{=aN(y4-cHK)DE0T77$7uU#1&i|JdL<|OO:T5#f9`k;iZ1~f|U!]$~(f763+');
define('NONCE_KEY',        '&h8D!c^[a@6xNzOI!}XZxS/~2P=NBpQ=%U:Y/u%,8dueIgqbP}7>bzxn,A/D&Wc?');
define('AUTH_SALT',        'bs=P6Z/|m>~eHR,kgtGb%).@:).hW{#/2<U{GX>i !1TPzc?s>Mzanu9MX. &U4;');
define('SECURE_AUTH_SALT', 'a`D_RD[G]f/9-tN o^j4[T7U2/ECY3.qeM8]J7a3S# =E^%pcF>OpIuiLM!%*.z|');
define('LOGGED_IN_SALT',   'a}0RX&O+sQlPR=H#l`045#=+e{-F )ur6En[0ec}M$qLB|!&=[g}5wf3+53xQ)zM');
define('NONCE_SALT',       '+wXMDnV(z51/^(f-n2mYhz]U_.DM{uO9.vN2Tk$[r+?YFCe|7C2/E!YDRYVRi9s?');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');


/**
 * Set custom paths
 *
 * These are required because wordpress is installed in a subdirectory.
 */
if (!defined('WP_SITEURL')) {
	define('WP_SITEURL', 'http://' . $_SERVER['SERVER_NAME'] . '/wordpress');
}
if (!defined('WP_HOME')) {
	define('WP_HOME',    'http://' . $_SERVER['SERVER_NAME'] . '');
}
if (!defined('WP_CONTENT_DIR')) {
	define('WP_CONTENT_DIR', dirname(__FILE__) . '/content');
}
if (!defined('WP_CONTENT_URL')) {
	define('WP_CONTENT_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/content');
}


/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
if (!defined('WP_DEBUG')) {
	define('WP_DEBUG', false);
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');


define('FS_METHOD','direct');
