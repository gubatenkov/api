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
  res.status(200).json({ message: `get job with id: ${req.params.id}` });
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
  res.status(200).json({ message: `update job with id: ${req.params.id}` });
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
