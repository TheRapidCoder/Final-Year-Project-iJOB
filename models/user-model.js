const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
{
	name: {type: String, required: true},
	rollNo: {type: String, required: true},
	branch: {type: String},
	email: {type: String, required: true},
	phone: {type: String, required: true},
	activated: {type: Boolean, default: false},
	isAdmin: {type: Boolean, default: false},
	password: {type: String, required: false}
}, {
	timeStamp: true
});

module.exports = mongoose.model('User', userSchema, 'users');

