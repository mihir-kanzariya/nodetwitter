const mongoose = require('mongoose');

// schema for Tweets
let feedSchema = mongoose.Schema({
	username: {
		type: String
	},
	tweet: {
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
	likes: [ { liker: String, status: String } ]
});

var Feed = module.exports = mongoose.model('feed', feedSchema);

// Create Tweet
module.exports.createTweet = function (newTweet, callback) {
	newTweet.save(callback);
};

// Fetch Tweets from db
module.exports.getTweet = function (query) {
	return new Promise((resolve, reject) => {
		Feed.find(query, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

// Calculate Number of tweet
module.exports.getTweetCount = function (user) {
	return new Promise((resolve, reject) => {
		Feed.count(user, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

// Add Likes to db
module.exports.like = function (query, condition) {
	return new Promise((resolve, reject) => {
		Feed.update(query, condition, function (err, data) {
			if (err) {
				reject(err);
			}
			// let res = Feed.find(query)?

			resolve(data);
		});
	});
};

module.exports.unLike = function (query, condition) {
	return new Promise((resolve, reject) => {
		Feed.update(query, condition, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

//
module.exports.getLiker = function (id) {
	return new Promise((resolve, reject) => {
		Feed.findOne(id, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

// update existing tweet
module.exports.updateTweet = function (query, condition) {
	return new Promise((resolve, reject) => {
		Feed.update(query, condition, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};
