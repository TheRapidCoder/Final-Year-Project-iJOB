const emailService = require('../services/email-service');
const userService = require('../services/user-service');
const activationService = require('../services/activation-service');
const hashService = require('../services/hash-service');
const tokenService = require('../services/token-service');


class AuthController {
	renderAuth(req, res) {
		res.render('students/auth');
	}

	async register(req, res) {
		const {rollNo} = req.body;
		let isAlumni = req.body.isAlumni

		if(!rollNo) {
			req.flash('error', 'Invalid roll no');
			return res.redirect('/register')
		}

		if(isAlumni) isAlumni = true;
		else isAlumni = false;

		const user = await userService.findUser({rollNo, isAlumni});
		console.log('user = ..', user)
		if(!user) {
			req.flash('error', 'User details not found.')
			return res.redirect('/register')
		}
        
		const activation = await activationService.generateCode(user);
        const setPasswordLink = `http://localhost:5000/activate/${activation.code}`;

		// send mail to user 
		emailService.setNewPassword(user , setPasswordLink);

		res.send(`Email has been sent on registered email....`);
	}

	async login(req, res) {
		// res.send('POST request made to /login')

		const email = req.body.email;
		const password = req.body.password;
		console.log(password);
		let isAlumni = req.body.isAlumni

		if(isAlumni) isAlumni = true;
		else isAlumni = false;

		if(!email || !password) {
			req.flash('error', 'Invalid data.')
			return res.redirect('/register')
		}

		const user = await userService.findUser({email, isAlumni});
		if(!user || !user.activated || !hashService.validPassword(password, user.password)) {
			req.flash('error', 'Invalid data')
			return res.redirect('/register')
		}

		const {accessToken, refreshToken} = tokenService.generateTokens({
			_id: user._id,
		})

		await tokenService.storeRefreshToken(refreshToken, user._id);

		res.cookie('refreshToken', refreshToken, {
			expiresIn: '24h',
			// maxAge: 365 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.cookie('accessToken', accessToken, {
			maxAge: 365 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
          
		// return res.redirect('/');
		return res.render('profile',{userName:user.name,
		userRoll:user.rollNo,
		userBranch:user.branch
		});
	}


	student(req, res, next) {
		res.render('index')
	}
}



module.exports = new AuthController();
