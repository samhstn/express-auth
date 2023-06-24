![build](https://github.com/samhstn/express-auth/actions/workflows/cleanliness.yml/badge.svg)

# An Express authentication example using Postgres and Sequelize

## DB Setup

```bash
yarn sequelize-cli db:create
yarn sequelize-cli db:migrate
```

## Running locally

```bash
yarn install
yarn start
```

## Optionally set these environment vars

```bash
echo "SAM_PASSWORD=$(openssl rand -base64 12)" > .env
echo "SESSION_SECRET=$(openssl rand -base64 12)" >> .env
```

## Useful script to check models and migrations are in sync

To check if the migrations and models are in sync,

ensure you have installed [`apgdiff`](https://apgdiff.com/)

then run:

```bash
export NODE_ENV=test
yarn sequelize-cli db:drop
yarn sequelize-cli db:create
yarn sequelize-cli db:migrate
pg_dump express_auth_test > migration.sql
yarn sequelize-cli db:drop
yarn sequelize-cli db:create
node models/sync.js
pg_dump express_auth_test > model.sql
apgdiff migration.sql model.sql > diff.sql
```
