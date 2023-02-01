FROM keymetrics/pm2:18-alpine

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
ENV RATE_LIMIT_MAX=$RATE_LIMIT_MAX
ENV RATE_LIMIT_MINUTE=$RATE_LIMIT_MINUTE
ENV GRPC_PORT=$GRPC_PORT

COPY commons /app/commons
COPY config /app/config
COPY data-access /app/data-access
COPY db /app/db
COPY drivers /app/drivers
COPY models /app/models
COPY test /app/test
COPY use-cases /app/use-cases
COPY package.json /app
COPY scripts/start.sh /app
COPY scripts/start.dev.sh /app
COPY scripts/wait-for-it.sh /app

RUN chmod +x wait-for-it.sh
RUN chmod +x start.dev.sh
RUN chmod +x start.sh

RUN npm install

RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates
