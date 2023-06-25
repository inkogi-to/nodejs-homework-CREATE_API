const {Contact} = require('../models/contact')

const {HttpError, ctrlWrapper} = require('../helpers')


const getAll = async (req, res) => {
    const result = await Contact.find({})
    res.json(result)

}
const getById = async (req, res) => {
    const {contactId} = req.params
    const result = await Contact.findById(contactId)
    if (!result) {
        throw HttpError(404, 'Contact not found')
    }
    res.json(result)

}
const createPost = async (req, res) => {
    const {body} = req
    const result = await Contact.create(body)
    res.status(201).json(result)

}
const removePost = async (req, res,) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
        throw HttpError(404, 'Not Found')
    }
    res.json({message: "Delete successfully"})

}
const updatePost = async (req, res,) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) {
        throw HttpError(400, "missing field favorite")
    }
    res.json(result)
}
const updateFavorite = async (req, res,) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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
    updateFavorite: ctrlWrapper(updateFavorite),
}
