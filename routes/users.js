const express = require('express');
const router = express.Router();
module.exports = router;

const usersController = require('../controllers/users_controller');

router.get('/sign-up' , usersController.signUp);
router.get('/sign-in' , usersController.signIn);
router.get('/profile' , usersController.profile);
router.post('/create' , usersController.create);
router.post('/createSession' , usersController.createSession);
