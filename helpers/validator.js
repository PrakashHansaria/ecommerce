exports.userSignUpValidator = (req, res, next) => {
    req.check('name', 'Please enter your name').notEmpty()
    req.check('email', 'Enter a valid email address')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    req.check('password', 'Password is required').notEmpty()
    const errors = req.validationErrors()
    if(errors){
        console.log(errors)
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
}