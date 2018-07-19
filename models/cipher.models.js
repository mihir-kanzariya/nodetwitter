const mongoose = require('mongoose');
let crypto = require('crypto');

// const help = require('../controllers/helper.controller.js');

let SECRETKEY = process.env.SECRETKEY;

let cipherSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	cipherText: {
		type: String,
		required: true
	},
	status: {
		type: Boolean,
		required: true
	},
	createdAt: {
		type: Date,
		default: function () {
			return new Date();
		}
	}
});

var cipher = module.exports = mongoose.model('cipher', cipherSchema);

module.exports.createCipher = function (newCipher, callback) {
	let cipheredText = this.Cipher(newCipher);
	let cipherData = new cipher({
		username: newCipher.username,
		cipherText: cipheredText,
		status: true
	});
	cipherData.save(callback);
};

module.exports.checkCipher = function (query) {
	return new Promise((resolve, reject) => {
		cipher.findOne(query, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

module.exports.updateCipher = function (query, condition) {
	return new Promise((resolve, reject) => {
		cipher.update(query, condition,{multi: true}, function (err, data) {
			if (err) {
				reject(err);
			}
      resolve(data);
		});
	});
};

module.exports.Cipher = function (cipherUser) {
	let cipher = crypto.createCipher('aes-128-cbc', 'SECRETKEY');
	let mycipher = cipher.update(JSON.stringify(cipherUser), 'utf8', 'hex');
	return mycipher += cipher.final('hex');
};
