const GroupService = require('../services/GroupService');
const catchAsync = require('../utils/catchAsync')

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the group
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *         rules:
 *           type: string
 *       example:
 *         id: d5fE_asz
 *         name: Sample Group
 *         image: sample-image-url
 *         description: This is a sample group.
 *         members: []
 *         rules: "Sample rules"
 */

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Group created successfully
 *       500:
 *         description: Some server error
 */

exports.createGroup = catchAsync(async (req, res) => {
  try {
    const group = await GroupService.createGroup(req.body, req.user._id);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
})

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       500:
 *         description: Some server error
 */

exports.getGroupsOwned = async (req, res, next) => {
  try {
    const groups = await GroupService.getOwnerGroups(req.params.ownerId);
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await GroupService.getGroups();
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 *       500:
 *         description: Some server error
 */

exports.getGroupById = async (req, res, next) => {
  try {
    const group = await GroupService.getGroupById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};

/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     summary: Update a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Some server error
 */

exports.updateGroup = async (req, res, next) => {
  try {
    const group = await GroupService.updateGroup(req.params.id, req.body);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Delete a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Some server error
 */

exports.deleteGroup = async (req, res, next) => {
  try {
    const group = await GroupService.deleteGroup(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};

/**
 * @swagger
 * /groups/{id}/members:
 *   post:
 *     summary: Add a member to a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member added successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Some server error
 */

exports.addMember = async(req, res) => {
  try {
    const {new_member} = req.body;
    const group = await GroupService.addMember(req.params.id, new_member);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error('process failed at controller', error)
    return res.status(400).json({ message: error.message})
  }
}

/**
 * @swagger
 * /groups/{groupId}/members/{memberId}:
 *   delete:
 *     summary: Remove a member from a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       404:
 *         description: Group or member not found
 *       500:
 *         description: Some server error
 */

exports.removeMember = async (req, res, next) => {
  try {
    const group = await GroupService.removeMember(req.params.groupId, req.params.memberId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};
