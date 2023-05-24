const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')
const {validateBody} = require("../../middlewares");
const schemas = require("../../schemas/contacts")


router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.createPost)

router.delete('/:contactId', ctrl.removePost)

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updatePost)

module.exports = router

