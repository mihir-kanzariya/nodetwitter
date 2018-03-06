const Feed = require('../models/feed.models');
const User = require('../models/users.models');
const Follower = require('../models/follow.models');


// Create Tweet
exports.createTweet = async function (req, res) {
	let username = req.user.username;
	let tweet = req.body.tweetArea;

	followerList = await Follower.getFollowingList(
			{ following: req.user.username, status: true});
	console.log(followerList)

	if (req.files.length !== 0) {
		img = req.files[0].path.replace('public', '');
	} else {
		img = "";
	}

	let newTweet = new Feed({
		username: username,
		tweet: tweet,
		tweetimg: img,
	});

	let getUserProfileCard = await User.getUser(
		{ username: req.user.username});

	let createTweet = Feed.createTweet(newTweet, function (err, NewTweet) {
		if (err) {
			console.log(err);
		}

		// socket.broadcast.to(socketid).emit('message', 'for your eyes only');
		// io.sockets.connected[userSocketId].emit('socketName', 'some text');
		res.redirect('/home');
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
		req.io.emit('like',{likercount: likercount.likes.length,tweetid: _id})
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
		req.io.emit('unlike',{likercount: likercount.likes.length,tweetid: _id})

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
