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
 
// Include local configuration
if (file_exists(dirname(__FILE__) . '/local-config.php')) {
	include(dirname(__FILE__) . '/local-config.php');
}

// Global DB config
if (!defined('DB_NAME')) {
	define('DB_NAME', 'cdws');
}
if (!defined('DB_USER')) {
	define('DB_USER', 'cdws');
}
if (!defined('DB_PASSWORD')) {
	define('DB_PASSWORD', 'cdws');
}
if (!defined('DB_HOST')) {
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
define('AUTH_KEY',         'hK9;U?+I[wH=1=,#Q<Ex~f)*vOgA!D)&umOAWK ^2SghgVdI`Aj]WY.z{%tPm^VX');
define('SECURE_AUTH_KEY',  'xU!xR94*:iS% R89]cdIMtS3SA+F~!NDbGid>l%]T`T8F+JB5}~ xcea15a,w]]}');
define('LOGGED_IN_KEY',    'mn+-XJBI07:*mNnPplr`C|_wA.G(bZyK?xTlL52{q-}=leEC&:E3EL 88U6VeDX2');
define('NONCE_KEY',        '0vFESTIV/[r2aW~nL#+0i*-Y PSYrmr;hyOl|Vd SK5RpHLULz23Z^)K<I6*,W|w');
define('AUTH_SALT',        'Fm]z2ePstNe=H/1E*qskxOyFVB/+v0z|%V{^,Q_cS n|}rv>_IcdU^|,U<$kScyd');
define('SECURE_AUTH_SALT', 'dO@0u2+|Avc_Ypwq>3.t%k_<2IVh9I<1uV^UOYi-tgb`EWs*4?I-G_wKU~SMfe+9');
define('LOGGED_IN_SALT',   'GGXsO/_*;NYbGO-[ad^YYywZ+#sl$m3c6E]aloFn#PyYV!(m<7WZ.w+:3n~uD:yF');
define('NONCE_SALT',       'xQ+;:2c>Z=b{_{zyD#{@+pyekb!|0k;-V|j^]+s-W):yiok$P9q*@b22`q0B*Yd~');

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
