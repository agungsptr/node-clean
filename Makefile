TAG ?= $(shell git rev-parse --abbrev-ref HEAD)

include .env

build:
	docker build -f build/release/Dockerfile -t agungsptr/node-clean-arch:$(TAG) .

compose:
	@echo "Starting services..."
	@docker-compose --env-file .env -f build/release/docker-compose.yml down -v  || true
	@docker-compose --env-file .env -f build/release/docker-compose.yml up -d --force-recreate

build_dev:
	docker build -f build/dev/Dockerfile -t agungsptr/node-clean-arch:$(TAG) .

compose_dev:
	@echo "Starting services..."
	@node db/mongoConfigGen.js
	@docker-compose --env-file .env -f build/dev/docker-compose.yml down -v  || true
	@docker-compose --env-file .env -f build/dev/docker-compose.yml up -d --force-recreate db
	@rm build/dev/mongo-init.js

.PHONY: all build test
