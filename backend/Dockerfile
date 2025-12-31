FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    wget \
    bash \
    zip \
    unzip \
    postgresql-dev \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    linux-headers \
    $PHPIZE_DEPS

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    intl \
    opcache \
    zip

# Install Xdebug
RUN pecl install xdebug && \
    docker-php-ext-enable xdebug

# Copy Xdebug configuration
COPY docker/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash && \
    mv /root/.symfony*/bin/symfony /usr/local/bin/symfony || true

# Set working directory
WORKDIR /var/www/symfony

# Copy composer files
COPY composer.* symfony.lock* ./

# Install dependencies (if composer.json exists)
RUN if [ -f composer.json ]; then composer install --no-scripts --no-autoloader --prefer-dist; fi

# Copy application code
COPY . .

# Generate autoload and run scripts
RUN if [ -f composer.json ]; then composer dump-autoload --optimize; fi

# Create var directory and set permissions
RUN mkdir -p /var/www/symfony/var/cache /var/www/symfony/var/log && \
    chown -R www-data:www-data /var/www/symfony/var || true

EXPOSE 9000

CMD ["php-fpm"]
