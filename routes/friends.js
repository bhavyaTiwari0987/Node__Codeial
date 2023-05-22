const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendController = require('../controllers/friends_controller');

router.get('/create' ,passport.checkAuthentication , friendController.createFriendship);

module.exports = router;