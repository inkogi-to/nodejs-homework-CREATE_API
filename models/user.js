const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleMongooseError } = require('../helpers')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const status = ['starter', 'pro', 'business']

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            match: emailRegex,
            required: [true, 'Email is required'],
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
        },
        subscription: {
            type: String,
            enum: status,
            default: 'starter',
        },
        token: {
            type: String,
            default: '',
        },
    },
    { versionKey: false, timestamps: true }
)

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().validate(...status),
})
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}
const User = model('users', userSchema)

module.exports = {
    User,
    schemas,
}
