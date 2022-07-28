const mongoose = require('mongoose');
const User = require('../models/user-model');
const users = require('./users');


mongoose.connect('mongodb://localhost:27017/ijob', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("Database Connected.")
});


const seedDB = async() => {
	// await User.deleteMany({});
	users.forEach(async(user) => {
		const s = new User(user);
		await s.save();
	})
}

seedDB();