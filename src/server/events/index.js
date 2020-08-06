const { Router } = require('express');

const router = new Router();

router.get('/events', async (req, res) => {
    res.send('events');
});

router.post('/event', (req, res) => {
    res.send('new event');
});

router.delete('/event/:id', (req, res) => {
    res.send('delete event');
});

router.put('/event/:id', (req, res) => {
    res.send('update event');
});

router.get('/event/:id/rsvp', (req, res) => {
    res.send('rsvp list for event');
});

router.post('/event/:id/rsvp/:memberId', (req, res) => {
    res.send('rsvp for member');
});

module.exports = router;
