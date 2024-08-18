const express = require('express')
const validate = require('../validations/validate/object')
const validateJob = require('../validations/validate/job')
const { updateJob } = require('../validations/job')
const JobController = require('../controllers/JobController')

const router = express.Router()

router.post('/', validateJob, JobController.createJob)
router.get('/', JobController.getJobs)
router.get('/:id', JobController.getJobById)
router.get('/poster/:id', JobController.getJobsByPoster)
router.put('/:id', validate(updateJob), JobController.updateJob)
router.delete('/:id', JobController.deleteJob)

module.exports = router


/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["remote", "contract"]
 *               company:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: The job was successfully created
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job data
 *       404:
 *         description: Job not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["remote", "contract"]
 *               company:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: The job was successfully updated
 *       404:
 *         description: Job not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Some server error
 */
