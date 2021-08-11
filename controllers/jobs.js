const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.user.userId }).sort(
    'createdAt'
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: {
      user: { userId },
    },
    params: { id: jobId },
  } = req;
  // check if job with such params exist in DB
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  // if not throw error
  if (!job) {
    throw new NotFoundError('job not found');
  }
  // else send job to the client
  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  // assign userId to createdBy filed
  req.body.createdBy = req.user.user.userId;
  // create Job instance in DB with client data
  const job = await Job.create(req.body);
  // response to client
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  // get data from the query
  const {
    body: { company, position },
    user: {
      user: { userId },
    },
    params: { id: jobId },
  } = req;
  // validate data for updating the job
  if (company === '' || position === '') {
    throw new BadRequestError("compnay and position can't be empty");
  }
  // find job in DB
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  // throw error if there is no such job
  if (!job) {
    throw new NotFoundError(`there is no job with id:${jobId}`);
  }
  // response to the client
  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  res.status(200).json({ message: `delete job with id: ${req.params.id}` });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
