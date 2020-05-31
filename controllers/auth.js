const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.signUp = (req, res)=>{
    const user = new User(req.body)
    user.save((err, user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    })
}; 

exports.signIn = (req,res) => {
    const {email, password} = req.body
    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User does not exist! Please Sign up."
            })
        }

        if(!user.authenticatePassword(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        res.cookie('toke', token, {expire: new Date()+ 1000})
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, name, email, role}})
    })

}

exports.signOut = (req, res) => {
    res.clearCookie('toke')
    res.json({message:'Signout success!'})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if(!user){
            res.status(403).json({
                error: "Access Denied"
            })
        }
        next();
}

exports.isAdmin = (req, res, next)=>{
    if(req.profile.role === 0){
        res.status(403).json({
            error: "Only Admin access here!"
        })
    }
    next();
}