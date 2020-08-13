'use strict';

require('dotenv').config();
const db = require('../src/server/db');

async function createTables() {
    await db.schema
        .createTable('events', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.text('description');
            table.timestamp('date').notNullable();
        })
        .createTable('members', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable();
        })
        .createTable('rsvps', (table) => {
            table
                .integer('event_id')
                .references('id')
                .inTable('events')
                .onDelete('CASCADE');
            table
                .integer('member_id')
                .references('id')
                .inTable('members')
                .onDelete('CASCADE');
            table.string('status', 5).notNullable();
            table.primary(['event_id', 'member_id']);
        });
}

createTables()
    .then(() => {
        console.log('Database created succesfully');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
