const Feed = require('../models/feed.models');
const User = require('../models/users.models');

// Create Tweet
exports.createTweet = async function (req, res) {
	let username = req.user.username;
	let tweet = req.body.tweet;

	let newTweet = new Feed({
		username: username,
		tweet: tweet
	});

	let getUserProfileCard = await User.getUser(
		{ username: req.user.username});

	let createTweet = Feed.createTweet(newTweet, function (err, NewTweet) {
		if (err) {
			console.log(err);
		}
		res.send({tweet: newTweet.tweet, getUserProfileCard: getUserProfileCard});
	});
};

// Liker perticular post
exports.like = async function (req, res) {
	let _id = req.body._id;
	let liker = req.user.username;
	let likeTweet = await Feed.like(
		{
			_id: _id
		},
		{
				 $push:
				{
					 likes: {liker: liker, status: 'liked'}
				}
		}
	 );
	let likercount = await Feed.getLiker({_id: _id});

	if (likeTweet) {
		res.send({likercount: likercount.likes.length});
	}
};

// Unlike tweet
exports.unLike = async function (req, res) {
	let _id = req.body._id;
	let liker = req.user.username;

	let unLikeTweet = await Feed.unLike(
		{
			_id: _id
		},
		{
			$pull:
				{
				  likes: {
				    liker: liker,
				    status: 'liked'
				  }
				}
		});

	let likercount = await Feed.getLiker({_id: _id});

	if (unLikeTweet) {
		res.send({likercount: likercount.likes.length});
	}
};

// Edit Tweet
exports.editTweet = async function (req, res) {
	let editTweet = await Feed.updateTweet({_id: req.body.id},
		{$set: { tweet: req.body.EditedTweet }});
	let getupdatedTweet = await Feed.getTweet({_id: req.body.id});
	if (editTweet) {
		res.send(getupdatedTweet);
	}
};
