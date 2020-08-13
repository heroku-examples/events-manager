'use strict';

const db = require('./index');

async function listMembers() {
    return db.select('*').from('members');
}

async function createMember({ name, email }) {
    const [result] = await db('members').insert({ name, email }).returning('*');
    return result;
}

async function deleteMember(id) {
    return db('members').where('id', id).delete();
}

async function updateMember({ id, name, email }) {
    if (!id) throw new Error('id is required');
    const [result] = await db('members')
        .where('id', id)
        .update({ name, email })
        .returning('*');
    return result;
}

module.exports = {
    listMembers,
    createMember,
    deleteMember,
    updateMember
};
