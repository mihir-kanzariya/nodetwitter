let bcrypt = require('bcrypt');
const crypto = require('crypto');
const cipher = require('../models/cipher.models');
// Compare Hash Password
exports.comparePassword = function (password, data) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, data.password, function (err, res) {
			if (err) {
				reject(err);
			}
			resolve(res);
		});
	});
};

// verify Link sent to user in mail
exports.verifyLink = async function (checkhash) {
	let getCipher = await cipher.checkCipher({cipherText: checkhash});
	if (checkhash === getCipher.cipherText && getCipher.status === true) {
		let updatecipher = await cipher.updateCipher({cipherText: checkhash},
			{$set: {status: false}});
		return getCipher;
	}
};
