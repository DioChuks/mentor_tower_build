const GroupService = require('../services/GroupService');

exports.createGroup = async (req, res, next) => {
  try {
    const group = await GroupService.createGroup(req.body);
    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await GroupService.getGroups();
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
};

exports.getGroupById = async (req, res, next) => {
  try {
    const group = await GroupService.getGroupById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

exports.updateGroup = async (req, res, next) => {
  try {
    const group = await GroupService.updateGroup(req.params.id, req.body);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    const group = await GroupService.deleteGroup(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const group = await GroupService.addMember(req.params.id, req.body);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const group = await GroupService.removeMember(req.params.groupId, req.params.memberId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};
