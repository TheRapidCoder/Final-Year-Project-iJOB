const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema(
	{
		title: {type: String},
		company: {type: String},
		experience: {type: String},
		salary: {type: String, },
		type: {type: String},
		location: {type: String, },
		description: {type: String, },
		role: {type: String, },
		education: {type: String},
		skills: {type: String},
		applylink: {type: String}
		// posted_by: {type: Schema.Types.ObjectId, ref: 'User', required: true}
	}
);


module.exports = mongoose.model('Job', jobSchema, 'jobs');

