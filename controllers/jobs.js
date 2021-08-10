const getAllJobs = async (req, res) => {
  res.status(200).json({ message: 'get all jobs' });
};

const getJob = async (req, res) => {
  res.status(200).json({ message: `get job with id: ${req.params.id}` });
};

const createJob = async (req, res) => {
  res.status(200).json({ message: 'create job' });
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
