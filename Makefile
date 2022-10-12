include .env

TAG ?= $(shell git rev-parse --abbrev-ref HEAD)
COMPOSE := docker-compose --env-file .env -f build/$(NODE_ENV)/docker-compose.yml

build:
	docker build -f build/$(NODE_ENV)/Dockerfile -t agungsptr/node-clean:$(TAG) .

compose:
	@echo "Generating DB config..."
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting services..."
	@$(COMPOSE) down -v  || true
	@$(COMPOSE) up -d --force-recreate

infra:
	@echo "Generating DB config..."
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "Starting DB service..."
	@$(COMPOSE) down -v  || true
	@$(COMPOSE) up -d --force-recreate db

.PHONY: all build test
