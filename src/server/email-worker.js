'use strict';

require('dotenv').config();
const Member = require('./db/members');

const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

async function main() {
    await redis.subscribe('events');
    redis.on('message', async (topic, message) => {
        if (topic === 'events') {
            // Process Information
            console.log(message);
            const allMembers = await Member.listMembers();
            for (let member of allMembers) {
                console.log(member.email);
            }
        }
    });
}

main()
    .then(() => {
        console.log('Email worker waiting for events');
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
