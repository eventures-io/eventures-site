#!/bin/bash
 
chown -R www-data:www-data .
 
exec "$@"