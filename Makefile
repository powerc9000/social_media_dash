SHELL := /bin/bash
export PATH  := $(shell npm bin):$(PATH)

.PHONY: build

build:
	buble index.js --no modules --output temp/index.js
	rollup --config
