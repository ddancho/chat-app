# CHAT APP

## Client side libraries

[React](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [Axios](https://axios-http.com/)

Style app with [Styled Component](https://styled-components.com/)

Socket.IO [Client](https://github.com/socketio/socket.io-client)

## Server side libraries

Server [Express](https://expressjs.com/)

Communication [Socket.IO](https://socket.io/)

Session storage [Redis](https://www.npmjs.com/package/connect-redis)

SQL query builder for mysql db [Knex](https://knexjs.org/)

## Reverse proxy and load balancer

[Nginx](https://nginx.org/)

## Infrastructure

[Docker](https://www.docker.com/)

[Node.js](https://nodejs.org/en/)

## How to start with the project

Clone project repo, first two new .env files needs to be created :

# Prepare env files

1.)

Navigate to the top folder, copy / paste .env.example and rename to .env

Write value for the following keys: MYSQL_ROOT_PASSWORD, MYSQL_PASSWORD

2.)

Navigate to the server subfolder, copy / paste .env.example and rename to .env

Write values for the following keys: DB_PASSWORD, SESSION_SECRET

MYSQL_PASSWORD and DB_PASSWORD have to be same value ...

# Prepare app

Navigate back to the top folder and execute command in the terminal :

docker-compose build

Wait a bit ..... .... ... .. .

Then if containers are build without errors execute command :

docker-compose up -d

# Database migration

In order to successfuly migrate db tables, replace in the .env file value for the DB_HOST key

DB_HOST=mysql

To

DB_HOST=localhost

save and execute command :

npx knex migrate:latest

Restore value back to:

DB_HOST=mysql

and save...

# Test the App

ChatApp is on : http://localhost/

PhPMyAdmin is on : http://localhost:8080/index.php

Test app locally, open app in chrome or ff, open another instance incognito, create acc, log in, chat...

When finished close docker containers, navigate to the top folder and execute command :

docker-compose down
