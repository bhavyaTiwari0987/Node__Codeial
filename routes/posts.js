const express = require('express');
const passport = require('passport');

const router = express.Router();

const PostsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, PostsController.create);
router.get('/destroy/:id' , passport.checkAuthentication, PostsController.destroy);

module.exports = router;