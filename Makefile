SHELL := /bin/bash
export PATH  := $(shell npm bin):$(PATH)

.PHONY: build

build:
	buble  js/ --no modules --output temp/
	rollup --config
