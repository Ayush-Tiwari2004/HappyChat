const joi = require('joi');

const signupValidation = (req, res, next) =>{
    const Schema = joi.object({
        username : joi.string().min(3).required(),
        email : joi.string().min(4).required(),
        password : joi.string().min(6).required()
    })
    const {error} = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({message: "bad request", error})
    }
    next();
}

const loginValidation = (req, res, next) =>{
    const Schema = joi.object({
        email : joi.string().min(4).required(),
        password : joi.string().min(6).required(),
    })
    const {error} = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({message: "bad request", error})
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}