const { Contact } = require('../models/contact')

const { HttpError, ctrlWrapper } = require('../helpers')

const getAll = async (req, res) => {
    const { _id: owner } = req.user
    const { page = 1, limit = 10 } = req.query
    console.log(req.query)
    const skip = (page - 1) * limit
    const result = await Contact.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate('owner', 'name')
    res.json(result)
}
const getById = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
    if (!result) {
        throw HttpError(404, 'Contact not found')
    }
    res.json(result)
}
const createPost = async (req, res) => {
    const { _id: owner } = req.user
    const result = await Contact.create({
        ...req.body,
        owner,
    })
    res.status(201).json(result)
}
const removePost = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
        throw HttpError(404, 'Not Found')
    }
    res.json({ message: 'Delete successfully' })
}
const updatePost = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    })
    if (!result) {
        throw HttpError(400, 'missing field favorite')
    }
    res.json(result)
}
const updateFavorite = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    })
    if (!result) {
        throw HttpError(404, 'Not Found')
    }
    res.json(result)
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    createPost: ctrlWrapper(createPost),
    removePost: ctrlWrapper(removePost),
    updatePost: ctrlWrapper(updatePost),
    updateFavorite: ctrlWrapper(updateFavorite),
}
