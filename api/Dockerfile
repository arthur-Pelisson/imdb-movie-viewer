FROM php:7.4-fpm

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Set working directory
WORKDIR /var/www

#Add the composerjson/composer.lock
COPY . /var/www/

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install zip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

#Install xdebug and enable it
RUN pecl install xdebug-3.0.4 \
    && docker-php-ext-enable xdebug

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

#Add the composerjson/composer.lock
COPY composer.json composer.lock /var/www/

# Install Laravel dependencies
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader

# Run database migrations
#RUN php artisan migrate

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

USER $user
