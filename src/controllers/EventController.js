const EventService = require('../services/EventService');

/**
 * Create a new event
 */
const createEvent = async (req, res) => {
  try {
    const event = await EventService.createEvent(req.user.id, req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all events for the logged-in user
 */
const getUserEvents = async (req, res) => {
  try {
    const events = await EventService.getUserEvents(req.user.id);
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get event by ID
 */
const getEventById = async (req, res) => {
  try {
    const event = await EventService.getEventById(req.params.id);
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * Update an event
 */
const updateEvent = async (req, res) => {
  try {
    const event = await EventService.updateEvent(req.params.id, req.body);
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * Delete an event
 */
const deleteEvent = async (req, res) => {
  try {
    await EventService.deleteEvent(req.params.id);
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEvent,
  getUserEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
