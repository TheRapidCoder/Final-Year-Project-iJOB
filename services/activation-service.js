const User = require('../models/user-model');
const Activation = require('../models/activation-model');
const crypto = require('crypto')


class ActivationService {

	async saveCode(user, code) {
		const ac = await Activation.create({
			userId: user._id,
			code
		})
		return ac;
	}

	async generateCode(user) {
		const code = crypto.randomInt(10000,99999);
		console.log(code);
		const activation = await this.saveCode(user, code);
		return activation;
	}

	async validCode(code) {
		const activation = await Activation.findOne({code});
		if(!activation) return false;
		return true;
	}

	async findUserFromCode(code) {
		const activation = await Activation.findOne({code});
		const user = await User.findById(activation.userId);
		return user;
	}
}

module.exports = new ActivationService();