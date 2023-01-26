#!/bin/sh

sleep 2
./wait-for-it.sh $MONGO_HOST:$MONGO_PORT -- echo "Database is ready"

echo "Seeding database..."
NODE_ENV=test node ./db/seeds/index.js
echo "Seeding completed"

echo "Starting service..."
pm2-runtime start /app/config/ecosystem.config.js
