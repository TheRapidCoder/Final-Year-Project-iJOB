const Job = require('../models/job-model');

class JobService {

	async getJob(filter) {
		return await Job.findOne(filter);
	}

	async findJobs(filter) {
		return await Job.find(filter);
	}

	async createJob(data) {
		const job = await Job.create(data);
		return job;
	}

	async getAllJobs() {
		const jobs = await Job.find({});
		return jobs;
	}

}

module.exports = new JobService();