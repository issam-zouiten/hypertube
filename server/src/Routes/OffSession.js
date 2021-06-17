const express = require('express');
const router = express.Router();

const Register = require('../controllers/register');
const Login = require('../controllers/login');
const checkConfirmToken = require('../controllers/confirmToken');
const sendResetEmail = require('../controllers/sendResetEmail');
const resetPassword = require('../controllers/resetPassword');
const LoginOmni = require('../controllers/loginOmni');

router.post('/login', Login);
router.post('/loginOmni', LoginOmni);
router.post('/register', Register);
router.post('/confirmEmail', checkConfirmToken);
router.post('/sendResetEmail', sendResetEmail);
router.post('/resetPassword', resetPassword);

module.exports = router;