#!/bin/sh

sleep 2
./wait-for-it.sh $MONGO_HOST:$MONGO_PORT -- echo "Database is ready"

echo "Starting service..."
pm2-runtime start /app/config/ecosystem.config.js
