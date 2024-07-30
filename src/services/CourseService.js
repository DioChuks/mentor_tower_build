const Course = require('../models/Course')

class CourseService {
  async createCourse(data) {
    const Course = new Course(data)
    return Course.save()
  }

  async getCourses() {
    return Course.find().exec()
  }

  async getCoursesByOwner(id) {
    return Course.find({ owner: id }).exec()
  }

  async getCourseById(id) {
    return Course.findById(id).exec()
  }

  async updateCourse(id, data) {
    return Course.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async deleteCourse(id) {
    return Course.findByIdAndDelete(id).exec()
  }
}

module.exports = CourseService
