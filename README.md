<div align="center" style="padding-bottom: 20px">
    <h1>Django + React + Postgres + Docker + Heroku template</h1>
    <img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray" alt=""/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt=""/>
    <img src="https://img.shields.io/badge/Docker-008FCC?style=for-the-badge&logo=docker&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" alt=""/>
</div>

This repository serves as a starting point for developing a
production-ready application using Django Rest Framework,
React with Typescript and Postgres in a Dockerized environment
with an option to deploy to Heroku. Running development setup
without docker-compose is also possible.

### Tools, libraries, frameworks:

This setup has been tested with Python 3.8/3.9 and Node 14.

### Backend

- `Python 3.8/9`
- `django`, `djangorestframework` Django + Django Rest Framework
- `django-cors-headers` - handling cross origin requests
- `coverage` - for code coverage reports and running unit tests
- `psycopg2` - needed to use Postgres (in Docker container)
- `gunicorn` - production wsgi http server
- `whitenoise` - building static files
- `black`, `isort`, `flake8` - for code quality (optional)

Suggested packages:

- `drf-yasg` - open api documentation (swagger and redoc)
- `django-rest-auth`, `django-allauth`, `djoser` - making auth easier
- `django-filter` - enables filtering querysets with url parameters and more
- `django-import-export` - import/export data from admin page
- `django-debug-toolbar` - useful debugging tool

### Frontend

- `Node 14`
- `react` - React
- `typescript` - Typescript
- `react-router-dom` - frontend routing
- `axios` - for making HTTP requests

Suggested packages:

- UI libraries such as `Chakra-UI`, `Material-UI`, `Reactstrap`, `TailwindCSS` etc.
- `react-query` - very useful package which handles data fetching logic for you
- `formik` + `yup` - handling form state and validation
- `@reduxjs/toolkit` + required packages
  (react-redux, redux etc.) - library which makes Redux much easier to understand and use
- `cypress` - for e2e testing

# Development setup

## Without Docker

### Backend

Create a virtual environment from cmd (or do it in Pycharm manually)

```shell script
cd backend
python -m venv venv
```

> Note: please adjust the command with the `python` executable on your
> computer, because sometimes (example: on Ubuntu or macOS) Python 3
> can only be executed using `python3`, not `python`.

Activate the virtual environment that was just created
On Windows:

```shell
venv\Scripts\activate
```

On Linux/macOS:

```shell
source venv/bin/activate
```

If successful, there should be `(venv)` in your cmd/terminal prompt.

Install the required packages with the following command.

```shell script
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Run django application from cmd (or add new Django configuration if using Pycharm)

```shell script
python manage.py runserver
```

Preparing (if there are any changes to db schema) and running migrations

```shell script
python manage.py makemigrations
python manage.py migrate
```

Create superuser

```shell script
python manage.py createsuper user
```

### Frontend

Install node dependencies.

```shell script
cd frontend
npm i -f
```

Run development server in second terminal

```shell script
npm start
```

### Backend tests coverage

```shell script
cd backend
```

Run tests using Coverage (unit tests + report) instead of `python manage.py test`

```shell script
coverage run manage.py test
```

Get report from coverage:

```shell script
coverage report -m
```

## With Docker

First define environmental variables in `.env` in root directory:

```
DB_NAME
DB_USERNAME
DB_PASSWORD
```

Make sure Docker Engine is running.

While in **root directory**, build docker images and run them with docker-compose. This might take up to few minutes.
Rebuilding image is crucial after installing new packages via pip or npm.

```shell script
docker-compose -f docker-compose.dev.yml up --build
```

Application should be up and running: backend `127.0.0.1:8000`, frontend `127.0.0.1:3000`, and nginx `127.0.0.1:8080`.

If images had been installed and **no additional packages have been installed**, just run to start containers:

```shell script
docker-compose -f docker-compose.dev.yml up
```

Bringing down containers with **optional** -v flag removes **all** attached volumes and invalidates caches.

```shell script
docker-compose -f docker-compose.dev.yml down
```

To run commands in active container:

```shell script
docker exec -it <CONTAINER_ID/CONTAINER_NAME> <command>
```

In case there is no bash installed, try:

```shell script
docker exec -it <CONTAINER_ID/CONTAINER_NAME> /bin/sh
```

e.g

```shell script
docker exec -it backend python manage.py createsuperuser
docker exec -it backend coverage run manage.py test
docker exec -it frontend /bin/sh
```

## CI/CD

This repository uses Github Actions to run test and deployment pipeline.  
`tnd.yml` - runs backend-frontend test separately.
There's also have automatic deploys application to Heroku. You need the autorization token for the deployment.

```shell
heroku create {your-app-name}
```

Make sure you are logged in to Heroku.
Generate an API token for your Heroku profile

```shell
heroku authorizations:create
```

Furthermore, There's success/failure notification _discord_ action that make teammates or another developer's work easier to handles mis-communication about merging PRs, as projects become more complex, so too does the process of building and testing the code.

`pipeline.yml` - runs backend and frontend code quality separately.

# Production Deployment

1.  [Create Heroku Account](https://signup.heroku.com/dc)
2.  [Download/Install/Setup Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

    - After install, log into Heroku CLI: `heroku login`

3.  Run: `heroku create <app name>` to create the Heroku application
4.  Set your environment variables for your production environment by running:

    ```
    heroku config:set VARIABLE=value
    ```

    Variables to set: `DJANGO_SETTINGS_MODULE=core.settings.prod`,
    `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_PASSWORD`, `PRODUCTION_HOST=<app name>.herokuapp.com`,
    `SECRET_KEY`,

5.  Run: `heroku stack:set container` so Heroku knows this is a containerized application
6.  Run: `heroku addons:create heroku-postgresql:hobby-dev` which creates the postgres add-on for Heroku
7.  Deploy app by running: `git push heroku master/main`,  
    _or_ manually in Heroku dashboard  
    _or_ by pushing to your github repository, having Automatic Deploys set up
8.  Go to `<app name>.herokuapp.com` to see the published website.

### Run commands in Heroku:

```shell
heroku run bash --app <your_app_name>
```

e.g

```shell
heroku run bash --app django-react-heroku-test
~ $ python backend/manage.py createsuperuser
```
