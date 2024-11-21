const Event = require('../models/Event');

/**
 * Create a new event
 */
const createEvent = async (userId, eventData) => {
  // check If end is provided, ensure that end is greater than start
  if (eventData.time.end && eventData.time.start > eventData.time.end) {
    throw new Error('End time must be greater than start time', 422);
  }

  // check If duration is omitted, calculate the duration based on the difference between start and end.
  if (!eventData.duration) {
    const startTime = new Date(`1970-01-01 ${eventData.time.start}`).getTime();
    const endTime = new Date(`1970-01-01 ${eventData.time.end}`).getTime();
    eventData.duration = (endTime - startTime) / 1000 / 60; // in minutes
  }
  
  const event = await Event.create({ ...eventData, user: userId });
  return event;
};

/**
 * Get all events for a specific user
 */
const getUserEvents = async (userId) => {
  const events = await Event.find({ user: userId }).sort({ date: 1 });
  return events;
};

/**
 * Get a single event by ID
 */
const getEventById = async (eventId) => {
  const event = await Event.findById(eventId).populate('user');
  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

/**
 * Update an event
 */
const updateEvent = async (eventId, updatedData) => {
  const event = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

/**
 * Delete an event
 */
const deleteEvent = async (eventId) => {
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

module.exports = {
  createEvent,
  getUserEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
