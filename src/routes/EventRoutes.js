const express = require('express');
const { GateRoute } = require('../middlewares/auth');
const EventController = require('../controllers/EventController');

const router = express.Router();

// Protect all routes
router.use(GateRoute);

// Create a new event
router.post('/', EventController.createEvent);

// Get all events for the user
router.get('/', EventController.getUserEvents);

// Get event by ID
router.get('/:id', EventController.getEventById);

// Update event
router.put('/:id', EventController.updateEvent);

// Delete event
router.delete('/:id', EventController.deleteEvent);

module.exports = router;
