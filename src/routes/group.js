const express = require('express')
const { GateRoute } = require('../middlewares/auth')
const GroupController = require('../controllers/GroupController')

const router = express.Router()
router.use(GateRoute)
/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               rules:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created successfully
 *       500:
 *         description: Some server error
 */

router.post('/', GroupController.createGroup)

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of groups
 *       500:
 *         description: Some server error
 */

router.get('/', GroupController.getGroups)

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
 *       404:
 *         description: Group not found
 *       500:
 *         description: Some server error
 */

router.get('/:id', GroupController.getGroupById)

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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               rules:
 *                 type: string
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Some server error
 */

router.put('/:id', GroupController.updateGroup)

/**
 * @swagger
 * paths:
 *  /groups/{id}:
 *    delete:
 *      summary: Delete a group by ID
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Group ID
 *      responses:
 *        200:
 *          description: Group deleted successfully
 *        404:
 *          description: Group not found
 *        500:
 *          description: Some server error
 */

router.delete('/:id', GroupController.deleteGroup)

/**
 * @swagger
 * paths:
 *  /groups/{id}/members:
 *    post:
 *      summary: Add a member to a group
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Group ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: string
 *      responses:
 *        200:
 *          description: Member added successfully
 *        404:
 *          description: Group not found
 *        500:
 *          description: Some server error
 */

router.post('/:id/members', GroupController.addMember)

/**
 * @swagger
 * paths:
 *  /groups/{groupId}/members/{memberId}:
 *    delete:
 *      summary: Remove a member from a group
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: groupId
 *          required: true
 *          schema:
 *            type: string
 *          description: Group ID
 *        - in: path
 *          name: memberId
 *          required: true
 *          schema:
 *            type: string
 *          description: Member ID
 *      responses:
 *        200:
 *          description: Member removed successfully
 *        404:
 *          description: Group or member not found
 *        500:
 *          description: Some server error
 */

router.delete('/:groupId/members/:memberId', GroupController.removeMember)

module.exports = router
