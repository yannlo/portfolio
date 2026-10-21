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

COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist || true

COPY . .
RUN composer install --no-dev --optimize-autoloader --no-scripts \
 && php bin/console cache:clear --env=prod --no-debug

COPY --from=assets /app/public/build ./public/build

ENV APP_ENV=prod SERVER_NAME=":80"
