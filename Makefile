TAG := $(shell git tag --sort=creatordate | tail -1)
COMPOSE := docker-compose -f build/$(NODE_ENV)/docker-compose.yml --log-level ERROR


# Infrastructure
build:
	docker build -t agungsptr/node-clean:$(TAG) .

compose-up:
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting services..."
	@TAG=$(TAG) $(COMPOSE) down -v || true
	@TAG=$(TAG) $(COMPOSE) up -d --force-recreate

compose-down:
	@TAG=$(TAG) $(COMPOSE) down -v || true

infra:
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting DB service..."
	@TAG=$(TAG) $(COMPOSE) down -v || true
	@TAG=$(TAG) $(COMPOSE) up -d --force-recreate db
	@sleep 2
	@make -s wait-db

auto:
	@echo "Turning off all containers..."
	@make -s compose-down
	@echo "Building docker..."
	docker build -q -t agungsptr/node-clean:$(TAG) .
	@make -s compose-up
	@make -s wait-db
	@sleep 2
	@make -s wait-app

wait-db:
	@echo "Checking database is ready..."
	@scripts/wait-for-it.sh 0.0.0.0:$(MONGO_PORT)
	@echo "Database is ready"

wait-app:
	@echo "Checking app  ready..."
	@scripts/wait-for-it.sh 0.0.0.0:$(APP_PORT) 
	@echo "App is ready"

# Application
start:
	@yarn start

dev:
	@yarn dev

grpc:
	@yarn grpc

grpc_client:
	@yarn grpc_client

# Database
seed:
	@echo "Seeding database..."
	@NODE_ENV=test node ./db/seeds/index.js
	@echo "Seed done."

# Test
test:
	@make -s wait-db
	@echo "Starting unit test..."
	@yarn test

coverage_test:
	@echo "Starting coverage test..."
	@yarn coverage_test

load_test:
	@make -s wait-db
	@make -s wait-app
	@echo "Starting performance test..."
	@yarn load_test
	@yarn load_test-result

.PHONY: build test
