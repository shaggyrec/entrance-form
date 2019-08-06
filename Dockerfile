FROM php:7.2-cli

MAINTAINER Alexander Shogenov <i@shagg.ru>

WORKDIR /app

COPY /php /app/php

EXPOSE 8080


RUN apt-get update && apt-get install -y default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN cd /app/php && composer install

COPY /db /app/db
COPY /react /app/react

RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs -y

WORKDIR /app/react
RUN npm i && npm run build:prod

WORKDIR /app/php

CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]

