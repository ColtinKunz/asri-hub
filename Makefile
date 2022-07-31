init: pipenv-lock pipenv-install migrations npm-install
	echo 'done' > /dev/null

purge-environments: purge-environment-backend purge-environment-frontend
	echo 'done' > /dev/null

pipenv-lock:
	cd backend && pipenv lock -r | sed s/^M//g > requirements.txt
	cd backend && pipenv lock -r --dev-only | sed s/^M//g > dev.requirements.txt

pipenv-install:
	cd backend && pipenv install --dev

migrations:
	cd backend/backend && pipenv run python manage.py makemigrations

npm-install:
	cd frontend && npm install

proxy-certs:
	# You can use this recipe to generate the certificates needed to test SSL on
	# your local machine. For the quickest solution, run "make proxy-certs" and
	# just hit enter for each prompt. Those prompts only matter if this was a
	# certificate you were planning to utilize.
	cd proxy/credentials && openssl req -x509 -newkey rsa:4096 -keyout ssl.key -out ssl.crt -sha256 -days 365 -nodes

purge-environment-backend:
	cd backend && pipenv --rm
	rm backend/*requirements.txt
	rm backend/Pipfile.lock

purge-environment-frontend:
	rm -rf frontend/node_modules
	rm frontend/package-lock.json
