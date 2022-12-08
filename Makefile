include .env

TAG ?= $(shell git rev-parse --abbrev-ref HEAD)
COMPOSE := docker-compose --env-file .env -f build/$(NODE_ENV)/docker-compose.yml


# Infrastructure
build:
	docker build -f build/$(NODE_ENV)/Dockerfile -t agungsptr/node-clean:$(TAG) .

compose-up: 
	@echo "RUNNING ON [$(NODE_ENV)] MODE"
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting services..."
	@$(COMPOSE) down -v  || true
	@$(COMPOSE) up -d --force-recreate

compose-down: 
	@echo "RUNNING ON [$(NODE_ENV)] MODE"
	@$(COMPOSE) down -v  || true

infra:
	@echo "RUNNING ON [$(NODE_ENV)] MODE"
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting DB service..."
	@$(COMPOSE) down -v  || true
	@$(COMPOSE) up -d --force-recreate db

# Application
start:
	@yarn start

dev:
	@yarn dev

# Database
seed:
	@echo "Seeding database..."
	@NODE_ENV=test node ./db/seeds/index.js
	@echo "Seed done."

# Unit Test
test:
	@echo "Unit Testing"
	@yarn test

coverage-test:
	@echo "Coverage Testing"
	@yarn coverage-test

load-test:
	@echo "Testing performance"
	@echo "Make sure that you have run the app before!"
	@yarn load-test
	@yarn load-test_result

.PHONY: all build test
