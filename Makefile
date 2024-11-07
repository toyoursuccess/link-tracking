deploy-dev:
	node_modules/.bin/serverless deploy

deploy-test:
	node_modules/.bin/serverless deploy --stage test

deploy-prod:
	node_modules/.bin/serverless deploy --stage prod

lint:
	node_modules/.bin/semistandard --fix
