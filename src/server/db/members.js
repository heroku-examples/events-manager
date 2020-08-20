'use strict';

const { Member } = require('../models');

async function listMembers() {
    return Member.findAll({ raw: true });
}

async function createMember({ name, email }) {
    const member = await Member.create({ name, email });
    if (!member) return null;

    return member.toJSON();
}

async function deleteMember(id) {
    return Member.destroy({ where: { id } });
}

async function updateMember({ id, name, email }) {
    if (!id) throw new Error('id is required');

    const member = await Member.findByPk(id);

    if (!member) return null;

    member.name = name;
    member.email = email;
    return member.save();
}

module.exports = {
    listMembers,
    createMember,
    deleteMember,
    updateMember
};
