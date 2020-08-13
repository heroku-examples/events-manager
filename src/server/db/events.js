'use strict';

const { query } = require('./index');

async function listEvents() {
    const text = 'SELECT * FROM events';
    const result = await query(text);
    return result && result.rows;
}

async function createEvent({ name, description, date }) {
    const text =
        'INSERT INTO events (name, description, date) VALUES ($1, $2, $3) RETURNING *';
    const result = await query(text, [name, description, date]);
    return result && result.rows && result.rows[0];
}

async function deleteEvent(id) {
    const text = 'DELETE FROM events WHERE id = $1';
    return query(text, [id]);
}

async function updateEvent({ id, name, description, date }) {
    if (!id) throw new Error('id is required');

    let text = 'UPDATE events SET id = id';
    const params = [id];

    if (name) {
        params.push(name);
        text += `, name = $${params.length}`;
    }

    if (description) {
        params.push(description);
        text += `, description = $${params.length}`;
    }

    if (date) {
        params.push(date);
        text += `, date = $${params.length}`;
    }

    text += 'WHERE id = $1 RETURNING *';
    const result = await query(text, params);
    return result && result.rows && result.rows[0];
}

async function createRsvp({ eventId, memberId, status }) {
    const text = `
  INSERT INTO rsvps (event_id, member_id, status) VALUES ($1, $2, $3)
  ON CONFLICT (event_id, member_id) DO
  UPDATE SET status = EXCLUDED.status
  RETURNING *
  `;
    const result = await query(text, [eventId, memberId, status]);
    return result && result.rows && result.rows[0];
}

async function listRsvps(eventId) {
    const text = `
  SELECT e.id AS event_id, e.name AS event_name, m.name, m.email, r.status FROM rsvps r
  INNER JOIN events e ON e.id = r.event_id
  INNER JOIN members m ON m.id = r.member_id
  WHERE e.id = $1
  `;
    const result = await query(text, [eventId]);
    return result && result.rows;
}

module.exports = {
    listEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    createRsvp,
    listRsvps
};
