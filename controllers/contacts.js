const contacts = require('../models/contacts')

const {HttpError, ctrlWrapper} = require('../helpers')


const getAll = async (req, res) => {
	const result = await contacts.listContacts()
	res.json(result)

}
const getById = async (req, res) => {
	const {contactId} = req.params
	const result = await contacts.getContactById(contactId)
	if (!result) {
		throw HttpError(404, 'Contact not found')
	}
	res.json(result)

}
const createPost = async (req, res) => {
	const {body} = req
	const result = await contacts.addContact(body)
	res.status(201).json(result)

}
const removePost = async (req, res,) => {
	const {contactId} = req.params
	const result = await contacts.removeContact(contactId)
	if (!result) {
		throw HttpError(404, 'Not Found')
	}
	res.json({message: "Delete successfully"})

}
const updatePost = async (req, res,) => {
	const {contactId} = req.params
	const result = await contacts.updateContact(contactId, req.body)
	if (!result) {
		throw HttpError(404, "Not Found")
	}
	res.json(result)

}


module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	createPost: ctrlWrapper(createPost),
	removePost: ctrlWrapper(removePost),
	updatePost: ctrlWrapper(updatePost),
}