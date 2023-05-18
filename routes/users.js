const express = require('express');
const router = express.Router();
const passport = require('passport');
module.exports = router;

const usersController = require('../controllers/users_controller');

router.get('/sign-up' , usersController.signUp);
router.get('/sign-in' , usersController.signIn);
router.post('/create' , usersController.create);
router.get('/profile' ,passport.checkAuthentication , usersController.profile);
//use passport as a middleware to authenticate
router.post('/createSession' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

router.get('/sign-out' , usersController.destroySession);
