'use strict';

const { Router } = require('express');
const membersService = require('../db/members');

const router = new Router();

router.get('/', async (req, res) => {
    const result = await membersService.listMembers();
    res.json(result);
});

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    const result = await membersService.createMember({ name, email });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await membersService.deleteMember(id);
    res.json({ message: 'member deleted' });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const result = await membersService.updateMember({ id, name, email });
    res.json(result);
});

module.exports = router;
