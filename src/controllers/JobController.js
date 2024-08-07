const JobService = require('../services/JobService');

exports.createJob = async (req, res, next) => {
  try {
    const job = await JobService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await JobService.getJobs();
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await JobService.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

exports.getJobsByPoster = async (req, res, next) => {
  try {
    const job = await JobService.getJobsByPoster(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await JobService.updateJob(req.params.id, req.body);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await JobService.deleteJob(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};
