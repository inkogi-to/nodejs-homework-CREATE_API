const {Schema, model} = require("mongoose")
const Joi = require('joi')

const {handleMongooseError} = require('../helpers')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        match: emailRegex,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
}, {versionKey: false, timestamps: true});


userSchema.post("save", handleMongooseError);


const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required()
})
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required()
})

const schemas = {
    registerSchema,
    loginSchema
}
const User = model("user", userSchema)

module.exports = {
    User,
    schemas
}

