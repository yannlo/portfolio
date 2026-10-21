# ── Stage 1 : assets frontend ──────────────────────────────
FROM node:22-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY webpack.config.js postcss.config.js tailwind.config.js ./
COPY assets ./assets
RUN npm run build        # produit public/build

# ── Stage 2 : app PHP ─────────────────────────────────────
FROM dunglas/frankenphp:php8.5
WORKDIR /app

RUN install-php-extensions pdo_pgsql intl opcache zip
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV APP_ENV=prod APP_DEBUG=0 SERVER_NAME=":80"

COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist

COPY . .
RUN composer install --no-dev --optimize-autoloader
# les auto-scripts composer exécutent cache:clear + assets:install

COPY --from=assets /app/public/build ./public/build
