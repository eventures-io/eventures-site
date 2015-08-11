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
 define('WP_DEBUG', true);

// Include local configuration
if (file_exists(dirname(__FILE__) . '/local-config.php')) {
	include(dirname(__FILE__) . '/local-config.php');
}
// Global DB config
if (ENVIRONMENT == 'production'){
//	$mysql_host = getenv('WPDB_TCP_ADDR');
		define('DB_NAME', 'wp_eventures');
		define('DB_USER', 'eventures');
	    define('DB_PASSWORD', 'msnet763*');
        define('DB_HOST', 'wp_db');
}else{
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
define('AUTH_KEY',         'N@n<V+4N BFWO%=4N! /R;({(kJ]QAizxtx>ig|oh3U|,u$/BC75V.3qr+0myDz&');
define('SECURE_AUTH_KEY',  ',V+&Z?7_m):$c,VXm5;@&)$]ZByLl8&=DamL=sqiB 66I-:)IaWct|KPZ_/{*;h<');
define('LOGGED_IN_KEY',    'n![ubGk(<-1bPgOlY+-46[ebQ[@UsD%<=/##QT!uMRzPnS&6A=>/S:Cp?T$+reH`');
define('NONCE_KEY',        ')iqQ&II+w%)(qvCXG~:Trw3JP-/@R2!=,> z]t)+W VkR}D#1S^rw?+Uf6C7;I@p');
define('AUTH_SALT',        '|Z,eUa~2T|kVBjDw7U~I)/ -AT0bw|>%`BiWa/qn#{H!$pgIR.#=V}TJX|d1JM 6');
define('SECURE_AUTH_SALT', 'Z*<I2^`,3N?g&7qf+/U[|O9E1S~<{KtL*OE4HtO;+oEQTU/`7oF,o9ey7b4.jX~e');
define('LOGGED_IN_SALT',   'Py;,L5!9b[dU0W=w1ei/qd4g%!bUrdUVbB veeF78~hKq@|p-{xbm2A|$`tY^),E');
define('NONCE_SALT',       'b 6G@]fupM+:pczNv]J?|TzeJP lh29+gch=R$~6eHE4+ow27!wQUr<j|yW-i*|}');

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
