'use strict';

const { Event, Rsvp, Member } = require('../models');

async function listEvents() {
    return Event.findAll({ raw: true });
}

async function createEvent({ name, description, date }) {
    const event = await Event.create({ name, description, date });
    if (!event) return null;

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
    const rsvps = await Event.findByPk(eventId, {
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
