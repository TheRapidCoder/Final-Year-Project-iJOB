
// controls job options
// creating a job
// reading a job
// updating a job
// deleting a job

const jobService = require('../services/job-service');
const Job = require('../models/job-model');


class JobController {

	async deleteJob(req, res) {
		const {id} = req.params;
		console.log(id)
		await Job.findByIdAndDelete(id);
		return res.send('successfully deleted')
	}

	async updateJob(req, res) {
		const {id} = req.params
		const job = await Job.findByIdAndUpdate(id, {...req.body})
		job.save()
		req.flash('success', 'Job successfully updated.')
		res.redirect(`/job/${id}`)
	}

	async readJob(req, res) {
		const jobId = req.params.id;
		if(!jobId) return res.redirect('/');
		try {
			var job = await jobService.getJob({_id: jobId});
		} catch(e) {
			req.flash('error', 'Invalid request.')
			return res.redirect('/job')
		}	
		// return res.send(job);
		res.render('jobs/detail', job)
	}

	async createJob(req, res) {
		try {
			console.log('data = ', req.body)
			var job = await jobService.createJob(req.body);
		} catch(e) {
			req.flash('error', 'Some data is missing.')
			return res.redirect(`/`)
		}
		return res.redirect(`/job/${job._id}`)
	}

	async listJobs(req, res) {
		const jobs = await jobService.getAllJobs();
		// return res.send(jobs);
		res.render('jobs/list', {jobs})
	}
}


module.exports = new JobController();