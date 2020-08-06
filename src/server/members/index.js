const { Router } = require('express');
const router = new Router();

router.get('/', async (req, res) => {
    res.send('members');
});

router.post('/', (req, res) => {
    res.send('new member');
});

router.delete('/:id', (req, res) => {
    res.send('delete member');
});

router.put('/:id', (req, res) => {
    res.send('update member');
});

module.exports = router;
