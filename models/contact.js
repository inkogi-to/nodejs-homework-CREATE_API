const {Schema, model} = require("mongoose")
const Joi = require('joi')

const {handleMongooseError} = require('../helpers')

const dateRegex = /^\d{2}-\d{2}-\d{4}$/

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: false
    },
    date: {
        type: String,
        match: dateRegex,
        require: true
    }

}, {versionKey: false, timestamps: true})

contactSchema.post("save", handleMongooseError)


const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
    status: Joi.string(),
    date: Joi.string().pattern(dateRegex).required()
})

const updateFavoriteScheme = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = {
    addSchema,
    updateFavoriteScheme
}
const Contact = model("contacts", contactSchema)

module.exports = {
    Contact,
    schemas
}
