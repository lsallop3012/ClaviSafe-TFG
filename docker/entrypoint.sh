#!/bin/bash
set -e

cd /var/www/html

php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan migrate --force || echo "[WARN] migrate failed — check logs"
php artisan db:seed --class=RoleSeeder --force || echo "[WARN] RoleSeeder failed — check logs"
php artisan storage:link --force || echo "[WARN] storage:link failed"

exec "$@"
