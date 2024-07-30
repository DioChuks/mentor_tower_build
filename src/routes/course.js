const express = require('express')
const CourseController = require('../controllers/CourseController')

const router = express.Router()

router.post('/', CourseController.createCourse)
router.get('/', CourseController.getCourses)
router.get('/:id', CourseController.getCourseById)
router.get('/owner/:id', CourseController.getCoursesByOwner)
router.put('/:id', CourseController.updateCourse)
router.delete('/:id', CourseController.deleteCourse)

module.exports = router
