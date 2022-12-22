FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=$NODE_ENV
ENV APP_PORT=$APP_PORT
ENV APP_NAME=$APP_NAME
ENV MONGO_USER=$MONGO_USER
ENV MONGO_PW=$MONGO_PW
ENV MONGO_PORT=$MONGO_PORT
ENV MONGO_DBNAME=$MONGO_DBNAME
ENV MONGO_HOST=$MONGO_HOST
ENV BYCRYPT_SALT=$BYCRYPT_SALT
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV JWT_EXPIRED=$JWT_EXPIRED
ENV RATE_LIMIT=$RATE_LIMIT

COPY commons /app/commons
COPY config /app/config
COPY controllers /app/controllers
COPY data-access /app/data-access
COPY db /app/db
COPY drivers /app/drivers
COPY middlewares /app/middlewares
COPY models /app/models
COPY routes /app/routes
COPY test /app/test
COPY use-cases /app/use-cases
COPY package.json /app

RUN npm install && \
    npm i -g nodemon

RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates
