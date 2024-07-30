const express = require('express')
const JobController = require('../controllers/JobController')

const router = express.Router()

router.post('/', JobController.createJob)
router.get('/', JobController.getJobs)
router.get('/:id', JobController.getJobById)
router.get('/poster/:id', JobController.getJobsByPoster)
router.put('/:id', JobController.updateJob)
router.delete('/:id', JobController.deleteJob)

module.exports = router
