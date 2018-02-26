const mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let UserSchema = mongoose.Schema({
	name: {
		type: String,
		default: ''
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	img: {
		type: String
	},
	createdAt: {
		type: Date,
		default: function () {
			return new Date();
		}
	},
	deletedAt: {
		type: Date,
		default: ''
	},
	updatedAt: {
		type: Date,
		default: function () {
			return new Date();
		}
	},
	updatedBy: {
		type: String,
		ref: 'User'
	},
	cipher: {
		cipherText: String,
		status: Boolean
	},
	status: {
		type: Boolean,
		required: true
	}
});

// cipher schema

var User = module.exports = mongoose.model('users', UserSchema);

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		return bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

module.exports.getUser = function (query) {
	// console.log(query);
	return new Promise((resolve, reject) => {
		User.findOne(query, function (err, data) {
			if (err) {
				reject(err);
			}
			// console.log(data);
			resolve(data);
		});
	});
};

module.exports.updateUser = function (query, condition) {
	console.log(query);
	return new Promise((resolve, reject) => {
		User.update(query, condition, function (err, data) {
			if (err) {
				reject(err);
			}
			console.log(data);
			resolve(data);
		});
	});
};

module.exports.updateProfile = function (query, name, img, email) {
	return new Promise((resolve, reject) => {
		User.update(query, {
			$set:
   { name: name,
   	img: img,
   	email: email
   }
		}, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

module.exports.searchUser = function (query) {
	return new Promise((resolve, reject) => {
		User.find(query, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

module.exports.getUserById = function (query) {
	return new Promise((resolve, reject) => {
		User.findById(query, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};
