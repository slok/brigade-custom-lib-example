default: docker-build-worker

# Name of this service/application
SERVICE_NAME := brigade-custom

# Shell to use for running scripts
SHELL := $(shell which bash)

# Get docker path or an empty string
DOCKER := $(shell command -v docker)

# Get docker-compose path or an empty string
DOCKER_COMPOSE := $(shell command -v docker-compose)

# Get the main unix group for the user running make (to be used by docker-compose later)
GID := $(shell id -g)

# Get the unix user id for the user running make (to be used by docker-compose later)
UID := $(shell id -u)

# Commit hash from git
COMMIT=$(shell git rev-parse --short HEAD)

# environment dirs
DEV_DIR := ./docker/dev
WORKER_DIR := ./docker/worker
SCRIPTS_DIR := ./hack/scripts

# docker build stuff
DOCKER_REGISTRY    ?= some.custom.registry:5000/
DOCKER_IMAGE 	   ?= custom-brigade-worker
DOCKER_BUILD_FLAGS :=
LDFLAGS            :=

# Commands
DOCKER_COMPOSE_DEV_RUN_CMD := cd $(DEV_DIR) && docker-compose run --rm $(SERVICE_NAME)
TEST_CMD := $(SCRIPTS_DIR)/test.sh
INSTALL_DEPS_CMD := $(SCRIPTS_DIR)/install-deps.sh
BUILD_WORKER_CMD := REPOSITORY=$(DOCKER_REGISTRY) IMAGE=$(DOCKER_IMAGE) $(SCRIPTS_DIR)/build-worker-image.sh
CLEAN_DEPS_CMD := rm -rf node_modules yarn.lock 
CLEAN_BUILD_CMD := yarn clean
BUILD_LIB_CMD := yarn build


# The default action of this Makefile is to build the development docker image
default: docker-build-worker

# Test if the dependencies we need to run this Makefile are installed
.PHONY: deps-development
deps-development:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

# Build the development docker image
.PHONY: build
build:
	cd $(DEV_DIR) && docker-compose build

.PHONY: deps-development
test: deps-development
	$(DOCKER_COMPOSE_DEV_RUN_CMD) $(TEST_CMD)

.PHONY: install-deps
install-deps: build
	$(DOCKER_COMPOSE_DEV_RUN_CMD) $(INSTALL_DEPS_CMD)

.PHONY: clean-deps
clean-deps: build
	$(DOCKER_COMPOSE_DEV_RUN_CMD) $(CLEAN_DEPS_CMD)

.PHONY: clean-build-lib
clean-build-lib: build
	$(DOCKER_COMPOSE_DEV_RUN_CMD) $(CLEAN_BUILD_CMD)

.PHONY: build-lib
build-lib: install-deps
	$(DOCKER_COMPOSE_DEV_RUN_CMD) $(BUILD_LIB_CMD)

.PHONY: docker-build-worker
docker-build-worker:
	IMAGE_VERSION=$(COMMIT) $(BUILD_WORKER_CMD)

.PHONY: shell
shell:
	$(DOCKER_COMPOSE_DEV_RUN_CMD) /bin/sh

