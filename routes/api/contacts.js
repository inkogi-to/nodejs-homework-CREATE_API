const express = require('express')
const Joi = require('joi')

const contacts = require('../../models/contacts')

const {HttpError} = require('../../helpers')

const router = express.Router()

const addShema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
	try {
		const result = await contacts.listContacts()
		res.json(result)
	} catch (err) {
		next(err)
	}


})

router.get('/:contactId', async (req, res, next) => {
	try {
		const {contactId} = req.params
		const result = await contacts.getContactById(contactId)
		if (!result) {
			throw HttpError(404, 'Contact not found')
			// const error = new Error('Not Found')
			// error.status = 404
			// throw error

			// return res.status(404).json(
			// 	{
			// 		message: 'Not Found'
			// 	}
			// )
		}
		res.json(result)
	} catch (err) {
		next(err)
	}

})

router.post('/', async (req, res, next) => {
	try {
		const {body} = req
		const {error} = addShema.validate(body)
		if (error) {
			throw HttpError(400, error.message)
		}
		const result = await contacts.addContact(body)
		res.status(201).json(result)

	} catch (err) {
		next(err)
	}
})

router.delete('/:contactId', async (req, res, next) => {
	res.json({message: 'template message'})
})

router.put('/:contactId', async (req, res, next) => {
	res.json({message: 'template message'})
})

module.exports = router

