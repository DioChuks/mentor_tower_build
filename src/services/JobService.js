const Job = require('../models/Job')

class JobService {
  async createJob(data) {
    const job = new Job(data)
    return job.save()
  }

  async getJobs() {
    return Job.find().exec()
  }

  async getJobsByPoster(id) {
    return Job.find({ user: id }).exec()
  }

  async getJobById(id) {
    return Job.findById(id).exec()
  }

  async updateJob(id, data) {
    return Job.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async deleteJob(id) {
    return Job.findByIdAndDelete(id).exec()
  }
}

module.exports = new JobService()
