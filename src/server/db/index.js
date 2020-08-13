'use strict';

const { parse } = require('pg-connection-string');

const db = require('knex')({
    client: 'pg',
    connection: {
        ...parse(process.env.DATABASE_URL),
        ssl: {
            rejectUnauthorized: false
        }
    },
    pool: { min: 0, max: 8 }
});

module.exports = db;
