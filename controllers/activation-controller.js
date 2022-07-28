const activationService = require('../services/activation-service')
const hashService = require('../services/hash-service');


class ActivationController {
	renderSetPassword(req, res) {
		const code = req.params.code;
		if(!code || !activationService.validCode(code)) {
			req.flash('error', 'Invalid Code')
			res.redirect('/register')
		}
		res.render('students/set-password');
	}

	async setPassword(req, res) {
		const password = req.body.password;
		const code = req.params.code;
		if(!password || !code || !activationService.validCode(code)) {
			req.flash('error', 'Invalid data');
			res.redirect('/register');
		}

		const user = await activationService.findUserFromCode(code)
		user.activated = true;
		user.password = hashService.generateHash(password);
		await user.save()
		return res.redirect('/login');
	}
}

module.exports = new ActivationController();

