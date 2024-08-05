const express = require('express')
const validate = require('../validations/validate/object')
const userValidation = require('../validations/user')
const { GateRoute } = require('../middlewares/auth')

const userController = require('../controllers/UserController')

const router = express.Router()
router.use(GateRoute);

router.patch(
  '/:userId',
  validate(userValidation.validateUpdateUser),
  userController.updateUserData
)

router.get('/:userId', userController.getUserProfile)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users/:userId:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the full user profile.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /users/:userId:
 *   patch:
 *     summary: Update user profile
 *     description: Update the user profile data.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *               password:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               bio:
 *                 type: string
 *               tier:
 *                 type: string
 *               areaOfInterest:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The updated user profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid updates.
 *       404:
 *         description: User not found.
 */
