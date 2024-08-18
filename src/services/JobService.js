const Job = require('../models/Job')

class JobService {
  async createJob(data) {
    const job = new Job(data)
    return job.save()
  }

  async getJobs() {
    return Job.find().populate('user', 'name tier role').exec()
  }

  async getJobsByPoster(id) {
    return Job.find({ user: id }).populate('user', 'name tier role').exec()
  }

  async getJobById(id) {
    return Job.findById(id).populate('user', 'name tier role').exec()
  }

  async updateJob(id, data) {
    return Job.findByIdAndUpdate(id, data, { new: true }).populate('user', 'name tier role').exec()
  }

  async deleteJob(id) {
    return Job.findByIdAndDelete(id).exec()
  }
}

module.exports = new JobService()
