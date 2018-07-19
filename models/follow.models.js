const mongoose = require('mongoose');

var FollowSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	following: {
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

var Follow = module.exports = mongoose.model('follow', FollowSchema);

// Follow users
module.exports.follow = function (newFollow, callback) {
	newFollow.save(callback);
};

// find user if
module.exports.checkFollow = function (query) {
	return new Promise((resolve, reject) => {
		Follow.findOne(query, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

module.exports.updateFollow = function (query, condition) {
	return new Promise((resolve, reject) => {
		Follow.update(query, condition, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

module.exports.getFollowersCount = function (user) {
	return new Promise((resolve, reject) => {
		Follow.count(user, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

module.exports.getFollowingList = function (user) {
	return new Promise((resolve, reject) => {
		Follow.find(user, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};
