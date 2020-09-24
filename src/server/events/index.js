'use strict';

const Router = require('express-promise-router');
const eventsService = require('../db/events');

const router = Router();

router.get('/', async (req, res) => {
    const result = await eventsService.listEvents();
    res.json(result);
});

// Create Event
router.post('/', async (req, res) => {
    const { name, description, date } = req.body;
    const result = await eventsService.createEvent({ name, description, date });
    res.json(result);
});

// Delete Event
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await eventsService.deleteEvent(id);
    res.json({ message: 'event deleted' });
});

// Update Event
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description, date } = req.body;
    const result = await eventsService.updateEvent({
        id,
        name,
        description,
        date
    });
    res.json(result);
});

router.get('/:id/rsvps', async (req, res) => {
    const id = req.params.id;
    const result = await eventsService.listRsvps(id);
    res.json(result);
});

router.post('/:id/rsvps/:memberId', async (req, res) => {
    const { id: eventId, memberId } = req.params;
    const { status } = req.body;
    const result = await eventsService.createRsvp({
        eventId,
        memberId,
        status
    });
    res.json(result);
});

module.exports = router;
