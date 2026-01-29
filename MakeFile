install:
	npm ci
	sudo npm link

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish --dry-run
