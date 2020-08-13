'use strict';

const db = require('./index');

async function listEvents() {
    return db.select('*').from('events');
}

async function createEvent({ name, description, date }) {
    const [result] = await db('events')
        .insert({ name, description, date })
        .returning('*');
    return result;
}

async function deleteEvent(id) {
    return db('events').where('id', id).delete();
}

async function updateEvent({ id, name, description, date }) {
    if (!id) throw new Error('id is required');

    const [result] = await db('events')
        .where('id', id)
        .update({ name, description, date })
        .returning('*');
    return result;
}

async function createRsvp({ eventId, memberId, status }) {
    const text = `
  ?
  ON CONFLICT (event_id, member_id) DO
  UPDATE SET status = EXCLUDED.status
  RETURNING *
  `;
    const result = await db.raw(text, [
        db('rsvps').insert({ event_id: eventId, member_id: memberId, status })
    ]);
    return result && result.rows && result.rows[0];
}

async function listRsvps(eventId) {
    const result = await db
        .select(
            'events.id as event_id',
            'events.name as event_name',
            'members.name as name',
            'members.email as email',
            'rsvps.status as status'
        )
        .from('rsvps')
        .innerJoin('events', 'events.id', 'rsvps.event_id')
        .innerJoin('members', 'members.id', 'rsvps.member_id')
        .where('events.id', eventId);

    return result;
}

module.exports = {
    listEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    createRsvp,
    listRsvps
};
