const express = require('express');
const router = express.Router();

const {requireSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userByID} = require('../controllers/user')

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req,res)=>{
    res.json({
        user: req.profile
    })
})
router.param('userId', userByID)

module.exports = router;