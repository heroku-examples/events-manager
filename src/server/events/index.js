const { Router } = require('express');

const router = new Router();

router.get('/', async (req, res) => {
    res.send('events');
});

router.post('/', (req, res) => {
    res.send('new event');
});

router.delete('/:id', (req, res) => {
    res.send('delete event');
});

router.put('/:id', (req, res) => {
    res.send('update event');
});

router.get('/:id/rsvps', (req, res) => {
    res.send('rsvp list for event');
});

router.post('/:id/rsvps/:memberId', (req, res) => {
    res.send('rsvp for member');
});

module.exports = router;
