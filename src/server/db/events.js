'use strict';

const { Event, Rsvp, Member } = require('../models');
const Redis = require('ioredis');

const cache = new Redis(process.env.REDIS_URL);
const pub = new Redis(process.env.REDIS_URL);

async function listEvents() {
    return Event.findAll({ raw: true });
}

async function createEvent({ name, description, date }) {
    const event = await Event.create({ name, description, date });
    if (!event) return null;

    pub.publish('events', 'A new event has been created with id ' + event.id);

    return event.toJSON();
}

async function deleteEvent(id) {
    return Event.destroy({ where: { id } });
}

async function updateEvent({ id, name, description, date }) {
    if (!id) throw new Error('id is required');

    const event = await Event.findByPk(id);

    if (!event) return null;

    event.name = name;
    event.description = description;
    event.date = date;
    return event.save();
}

async function createRsvp({ eventId, memberId, status }) {
    const rsvp = await Rsvp.findOne({ where: { eventId, memberId } });
    if (rsvp) {
        rsvp.status = status;
        rsvp.save();
        return rsvp;
    }

    return Rsvp.create({ eventId, memberId, status });
}

async function listRsvps(eventId) {
    const key = `events:${eventId}`;
    const cached = await cache.get(key);
    let rsvps;

    if (cached) {
        try {
            console.log('Cache hit');
            rsvps = JSON.parse(cached);
            return rsvps;
        } catch (err) {
            console.error(err);
        }
    }

    rsvps = await Event.findByPk(eventId, {
        attributes: ['id', 'name', 'description', 'date'],
        include: [
            {
                model: Member,
                as: 'members',
                attributes: ['name', 'email'],
                through: {
                    as: 'rsvp',
                    attributes: ['status']
                }
            }
        ]
    });

    if (!rsvps) return [];

    await cache.set(key, JSON.stringify(rsvps), 'EX', 3 * 60);
    console.log('Cache miss');

    return rsvps.toJSON();
}

module.exports = {
    listEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    createRsvp,
    listRsvps
};
