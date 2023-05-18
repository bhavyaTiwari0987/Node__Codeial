const express = require('express');
const passport = require('passport');

const router = express.Router();

const PostsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, PostsController.create);

module.exports = router;