FROM php:8.2-apache

# 1. Instalar herramientas y extensiones (Añadido libpq-dev y pdo_pgsql para Supabase)
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip \
    && docker-php-ext-enable pdo_mysql pdo_pgsql

# 2. Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# 3. Redireccionar Apache a la carpeta /public de Laravel (Crucial para Render)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Establecer directorio de trabajo y copiar el código del proyecto
WORKDIR /var/www/html
COPY . .

# 6. Instalar dependencias de producción de Laravel
RUN composer install --no-dev --optimize-autoloader

# 7. Dar permisos correctos a las carpetas de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["apache2-foreground"]