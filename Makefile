SHELL := /bin/bash
export PATH  := $(shell npm bin):$(PATH)

.PHONY: build

build:
	rollup index.js | buble  --output bin/index.js
