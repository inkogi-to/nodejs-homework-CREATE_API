const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')
const { validateBody, isValidId, authenticate } = require('../../middlewares')
const { schemas } = require('../../models/contact')

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, isValidId, ctrl.getById)
//
router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.createPost)
//
router.delete('/:contactId', authenticate, isValidId, ctrl.removePost)
//
router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updatePost)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteScheme), ctrl.updateFavorite)

module.exports = router
