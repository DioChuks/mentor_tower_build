const CourseService = require('../services/CourseService')

const createCourse = async (req, res, next) => {
  try {
    const job = await CourseService.createCourse(req.body)
    res.status(201).json(Course)
  } catch (error) {
    next(error)
  }
}

const getCourses = async (req, res, next) => {
  try {
    const Courses = await CourseService.getCourses()
    res.status(200).json(Courses)
  } catch (error) {
    next(error)
  }
}

const getCourseById = async (req, res, next) => {
  try {
    const Course = await CourseService.getCourseById(req.params.id)
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json(Course)
  } catch (error) {
    next(error)
  }
}

const getCoursesByOwner = async (req, res, next) => {
  try {
    const Course = await CourseService.getCoursesByOwner(req.params.id)
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json(Course)
  } catch (error) {
    next(error)
  }
}

const updateCourse = async (req, res, next) => {
  try {
    const Course = await CourseService.updateCourse(req.params.id, req.body)
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json(Course)
  } catch (error) {
    next(error)
  }
}

const deleteCourse = async (req, res, next) => {
  try {
    const Course = await CourseService.deleteCourse(req.params.id)
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json({ message: 'Course deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  getCoursesByOwner,
  updateCourse,
  deleteCourse
}
