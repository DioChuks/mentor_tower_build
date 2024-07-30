const CourseService = require('../services/CourseService');

exports.createJob = async (req, res, next) => {
  try {
    const job = await CourseService.createCourse(req.body);
    res.status(201).json(Course);
  } catch (error) {
    next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const Courses = await CourseService.getCourses();
    res.status(200).json(Courses);
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const Course = await CourseService.getCourseById(req.params.id);
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(Course);
  } catch (error) {
    next(error);
  }
};

exports.getCoursesByPoster = async (req, res, next) => {
  try {
    const Course = await CourseService.getCoursesByOwner(req.params.id);
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(Course);
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const Course = await CourseService.updateCourse(req.params.id, req.body);
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(Course);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const Course = await CourseService.deleteCourse(req.params.id);
    if (!Course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};
