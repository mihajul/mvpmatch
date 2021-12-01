# project-backend

## Setup

Run `yarn` to install dependencies

## Database creation

Create two postgres databases, one for the api and one for integration tests (for example `project` and `project_test`).
Example commands to create a user and a database:

`CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypass'`

`CREATE DATABASE project`
`GRANT ALL PRIVILEGES ON DATABASE project TO myuser`

## Environment variables

In development, the environment variables are expected to be in `.env` file in the repository root. See `.env_example` file for example configuration.

## Run migrations

Run `yarn run migrate` to create the database tables.

## Run server

Run `yarn start` to start the server or `yarn dev` to start the server in development mode (monitor files for changes and restart automatically)

## Run tests

Run `yarn test` to run the integration tests. Make sure you have the `DATABASE_TEST_URL` environment variable set.

## Run lint and prettier

Run `yarn lint` or `yarn prettier` to invoke lint or prettier
