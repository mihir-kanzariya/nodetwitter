const User = require('../models/users.models');
const Feed = require('../models/feed.models');
const Follower = require('../models/follow.models');
const following = require('../models/users.models');

// Get Details like following list,follower list,follower count,following count
// tweet count,profile card following user tweet like unlike status and sort tweet by date
// and time
exports.homeGet = async function (req, res) {
	let followingList = await Follower.getFollowingList(
		{ username: req.user.username, status: true});
	let getUserProfileCard = await User.getUser(
		{ username: req.user.username});
	let followercount = await Follower.getFollowersCount(
		{ following: req.user.username, status: true});
	let followingcount = await Follower.getFollowersCount(
		{ username: req.user.username, status: true});
	let getTweetCount = await Feed.getTweetCount(
		{username: req.user.username});

	let getTweets = [];
	let getUser;
	let getTweetsByDate = [];
	let getAllTweets = [];
	let dateTemp;

	for (let k = 0; k < followingList.length; k++) {
		getTweets = await Feed.getTweet(
			{username: followingList[k].following});

		getUser = await User.getUser({ username: followingList[k].following });

		for (let count = getTweets.length - 1; count >= 0; count--) {
			getTweets[count].path = getUser.img;
			getTweets[count].name = getUser.name;
			dateTemp = formatDate(getTweets[count].createdAt);
			getTweets[count].date = dateTemp;
			getAllTweets.push(getTweets[count]);
		}
	}

	getAllTweets.sort((a, b) => {
		if (a.createdAt > b.createdAt) { return 1; } else if (a.createdAt < b.createdAt) { return -1; } else { return 0; }
	});
	// req.flash('info', 'Welcome');
	res.render('home', {
		tweet: getAllTweets,
		getUser: getUser,
		getUserProfileCard: getUserProfileCard,
		followercount: followercount,
		followingcount: followingcount,
		getTweetCount: getTweetCount,
		username: req.user.username

	});
};

// Show Your own Profile
exports.showProfileGet = async function (req, res) {
	let checkUser = await User.getUser({ username: req.user.username });
	let followercount = await Follower.getFollowersCount(
		{ following: req.user.username, status: true});
	let followingcount = await Follower.getFollowersCount(
		{ username: req.user.username, status: true});
	let getTweets = await Feed.getTweet(
		{username: req.user.username});
	let getTweetCount = await Feed.getTweetCount(
		{username: req.user.username});

	for (let count = getTweets.length - 1; count >= 0; count--) {
  	dateTemp = formatDate(getTweets[count].createdAt);
		getTweets[count].date = dateTemp;
	}

	res.render('showProfile',
		{ checkUser: checkUser,
			followercount: followercount,
			followingcount: followingcount,
			getTweets: getTweets,
			getTweetCount: getTweetCount,
			username: req.user.username
		});
};

// Render on edit profile
exports.profileGet = async function (req, res) {
	let checkUser = await User.getUser({
		username: req.user.username
	});
	res.render('editprofile', { checkUser: checkUser, username: req.user.username});
};

// submit and save edited profile
exports.profilePost = async function (req, res) {
	let name = req.body.name;
	let email = req.body.email;
	let img;

	let checkUser = await User.getUser({ email: req.user.email });
	if (req.files.length == 0) {
		img = checkUser.img;
		let updatePro = await User.updateProfile(
			{
				username: req.user.username
			}, name, img, email);
	} else {
		img = req.files[0].path.replace('public', '');
		let updatePro = await User.updateProfile(
			{
				username: req.user.username
			}, name, img, email);
	}
	res.redirect('/showProfile/' + req.user.username);
};

// To put tweet time in proper format
function formatDate (dateFrom) {
	let monthNames = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June',
		'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	let d = new Date(dateFrom),
		month = monthNames[d.getMonth() + 1 ],
		day = d.getDate(),
		year = d.getFullYear(),
		hrs = d.getHours(),
		min = d.getMinutes();

	let date = day + ' ' + month + ' ' + year + '  ' + hrs + ':' + min;
	return date;
}
