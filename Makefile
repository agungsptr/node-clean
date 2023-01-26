include .env

TAG ?= $(shell git tag --sort=creatordate | tail -1)
COMPOSE := docker-compose -f build/$(NODE_ENV)/docker-compose.yml

# Full auto
auto:
	@echo "Building docker"
	docker build -q -t agungsptr/node-clean:$(TAG) .
	@make compose-up
	@scripts/wait-for-it.sh 0.0.0.0:$(MONGO_PORT) -- echo "Database is ready"
	@scripts/wait-for-it.sh 0.0.0.0:$(APP_PORT) -- echo "App is ready"

# Infrastructure
build:
	docker build -t agungsptr/node-clean:$(TAG) .

compose-up: 
	@echo "RUNNING ON [$(NODE_ENV)] MODE"
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting services..."
	@TAG=$(TAG) $(COMPOSE) down -v  || true
	@TAG=$(TAG) $(COMPOSE) up -d --force-recreate

compose-down: 
	@echo "RUNNING ON [$(NODE_ENV)] MODE"
	@$(COMPOSE) down -v  || true

infra:
	@echo "RUNNING ON [$(NODE_ENV)] MODE"
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting DB service..."
	@TAG=$(TAG) $(COMPOSE) down -v  || true
	@TAG=$(TAG) $(COMPOSE) up -d --force-recreate db

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

# Unit Test
test:
	@echo "Unit Testing"
	@yarn test

coverage_test:
	@echo "Coverage Testing"
	@yarn coverage_test

load_test:
	@echo "Testing performance"
	@echo "Make sure that you have run the app before!"
	@yarn load_test
	@yarn load_test-result

.PHONY: all build test
