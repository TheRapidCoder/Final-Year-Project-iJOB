const bcrypt = require('bcrypt');

class HashService {
	generateHash(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}

	validPassword(password1, password2) {
		return bcrypt.compareSync(password1, password2);
	}
}

module.exports = new HashService();