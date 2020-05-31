const express = require('express');
const router = express.Router();

const {signUp, signIn, signOut, requireSignin} = require('../controllers/auth')
const {userSignUpValidator} = require('../helpers/validator')

router.post('/signup', userSignUpValidator, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

router.get('/hello', requireSignin, (req,res) => {
    res.send("Hello there")
})

module.exports = router;