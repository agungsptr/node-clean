FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=$NODE_ENV
ENV PORT=7000
ENV MONGO_USER=$MONGO_USER
ENV MONGO_PW=$MONGO_PW
ENV MONGO_PORT=$MONGO_PORT
ENV MONGO_DBNAME=$MONGO_DBNAME
ENV MONGO_HOST=$MONGO_HOST

COPY commons /app/commons
COPY config /app/config
COPY controllers /app/controllers
COPY data-access /app/data-access
COPY db /app/db
COPY drivers /app/drivers
COPY models /app/models
COPY routes /app/routes
COPY use-cases /app/use-cases
COPY package.json /app

RUN npm install && \
    npm i -g nodemon

RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates

