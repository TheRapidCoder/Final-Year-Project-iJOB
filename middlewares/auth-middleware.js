const tokenService = require('../services/token-service')
const userService = require('../services/user-service')


module.exports.isLoggedIn = async function(req, res, next) {
	const {accessToken} = req.cookies;
	if(!accessToken) {
		console.log('isLoggedIn reporting: User is not logged in')
		req.flash('error', 'You are not logged in.')
		return res.redirect('/register');
	}
	console.log('isLoggedIn reporting: User is logged in')
	next();
}

module.exports.isStudent = async function(req, res, next) {
	const {accessToken} = req.cookies;
	const {_id:userId} = await tokenService.verifyAccessToken(accessToken);
	if(!userId) {
		console.log('isStudent reporting: User is not a student or alumni.')
		req.flash('error', 'Invalid data.')
		return res.redirect('/redirect')
	}
	console.log('isStudent reporting: User is a student or alumni.')
	user = await userService.findUser({_id: userId});
	if(!user || !user.activated) {
		req.flash('error', 'Account not activated.')
		return res.redirect('/register')
	}
	req.user = user;

	next()
}


module.exports.isAlumni = async function (req, res, next) {
	const {accessToken} = req.cookies;
	const {_id: userId} = await tokenService.verifyAccessToken(accessToken)
	if(!userId) {
		req.flash('error', 'Invalid data.')
		return res.redirect('/register')
	}
	user = await userService.findUser({_id: userId});
	if(!user || !user.activated || !user.isAlumni) {
		console.log('isAlumni reporting: User is not a alumni.')
		req.flash('error', 'Not allowed')
		return res.redirect('/register')
	}
	req.user = user;
	console.log('isAlumni reporting: User is a alumni.')

	next()
}

