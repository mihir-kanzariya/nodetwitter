const express = require('express');
const router = express.Router();
let multer = require('multer');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/users.models');

//Upload profile pic
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  path: function (req, file, cb) {
    cb(null, file.path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },

});

let upload = multer({
  storage: storage,
  fileFilter: function(req,file,cb){
    let ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        let imgErr = new Error('Only images are allowed');
        return cb(imgErr)
        // res.flash('failed','Only images are allowed')
        // res.render('editprofile');
    }
    cb(null, true)
  }

 });

//Controllers
const twitterController = require('../controllers/twitter.controller.js');
const homeController = require('../controllers/home.controller.js');
const searchFriendController = require('../controllers/SearchFriend.controller.js');
const feedController = require('../controllers/feed.controller.js');

//Register user
router.get('/register', twitterController.registerGet);
router.post('/register', twitterController.registerPost);

//Login
router.get('/login', twitterController.loginGet);

//Home route
router.get('/', ensureAuthenticated, homeController.homeGet);
router.get('/home', ensureAuthenticated,homeController.homeGet);


//Verify Email conformation
router.get('/verifyAccount', twitterController.verifyAccount);
router.get('/verifyResetpw', twitterController.verifyResetpw);

// Find User to change password
router.get('/finduser', twitterController.finduserGet);
router.post('/finduser', twitterController.finduserPost);

//Restet pw of found user
// router.get('/resetpw', twitterController.resetpwGet);
router.post('/resetpw', twitterController.resetpwPost);

//Edit profile of logged in user
router.get('/:username/editprofile', ensureAuthenticated, homeController.profileGet);
router.post('/profile', upload.any(), homeController.profilePost);

//Show profile of logged in user
// router.get('/showProfile', ensureAuthenticated, homeController.showProfileGet);
router.get('/showProfile/:username', ensureAuthenticated, homeController.showProfileGet);

//search user by name
router.get('/searchFriend', ensureAuthenticated, searchFriendController.searchFriendGet);
router.post('/searchFriend', searchFriendController.searchFriendPost);

//show other user profile
router.get('/showFriendProfile/:username', ensureAuthenticated, searchFriendController.showFriendProfile);

//Follow & Unfollow other user
router.post('/unfollow', ensureAuthenticated, searchFriendController.unfollow);
router.post('/follow', ensureAuthenticated, searchFriendController.follow);

//Create Tweet
router.post('/createTweet', ensureAuthenticated, feedController.createTweet);

//Edit Tweet
router.post('/editTweet', ensureAuthenticated, feedController.editTweet);

//list of Following and Followers
router.post('/following', ensureAuthenticated, searchFriendController.getFollowingList);
router.post('/follower', ensureAuthenticated, searchFriendController.getFollowerList);

//List tweets of user
router.post('/getTweet', ensureAuthenticated, searchFriendController.getTweet);
router.post('/getFriendTweets', ensureAuthenticated, searchFriendController.getFriendTweet);

//like & unlike features
router.post('/like', ensureAuthenticated, feedController.like);
router.post('/unLike', ensureAuthenticated, feedController.unLike);

//Logout
router.get('/logout', twitterController.logout);

//Login >> using Passport-local
router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true,
    }
  )
);



module.exports = router;

//Middleware to ensure login
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
    } else {
    req.flash('failed','Please Login');
    res.redirect('/login');
  }
}



