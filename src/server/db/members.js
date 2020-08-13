'use strict';

const { query } = require('./index');

async function listMembers() {
    const text = 'SELECT * FROM members';
    const result = await query(text);
    return result && result.rows;
}

async function createMember({ name, email }) {
    const text =
        'INSERT INTO members (name, email) VALUES ($1, $2) RETURNING *';
    const result = await query(text, [name, email]);
    return result && result.rows && result.rows[0];
}

async function deleteMember(id) {
    const text = 'DELETE FROM members WHERE id = $1';
    return query(text, [id]);
}

async function updateMember({ id, name, email }) {
    if (!id) throw new Error('id is required');

    let text = 'UPDATE members SET id = id';
    const params = [id];

    if (name) {
        params.push(name);
        text += `, name = $${params.length}`;
    }

    if (email) {
        params.push(email);
        text += `, email = $${params.length}`;
    }

    text += 'WHERE id = $1 RETURNING *';
    const result = await query(text, params);
    return result && result.rows && result.rows[0];
}

module.exports = {
    listMembers,
    createMember,
    deleteMember,
    updateMember
};
