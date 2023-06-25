const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')
const {validateBody, isValidId} = require("../../middlewares");
const {schemas} = require("../../models/contact")


router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)
//
router.post('/', validateBody(schemas.addSchema), ctrl.createPost)
//
router.delete('/:contactId', isValidId, ctrl.removePost)
//
router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updatePost)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteScheme), ctrl.updateFavorite)

module.exports = router
