# events-manager

A simple Events Manager API using Node.js Express and Heroku Postgres

## Requirements

1. Create a Heroku application:

```bash
heroku create app-name
```

2. Install a Heroku Postgres Addon on your new application:

```
heroku addons:create heroku-postgresql:hobby-dev -a app-name
```

3. Load Database Schema

```
heroku pg:psql -a app-name < scripts/events-manager.sql
```

In case you need to reset your database you can run:

```bash
heroku pg:reset -a app-name
```

_Note: The previous command will destroy your database, so, run it only if you need to_

## How to start?

Start simple by running `npm run watch`. This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app).
