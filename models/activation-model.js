const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activationSchema = new Schema(
{
	code: { type: String },
	userId: {type: Schema.Types.ObjectId, ref: 'User'}	
}, {
	timeStamp: true
})

module.exports = mongoose.model('Activation', activationSchema, 'activations');

