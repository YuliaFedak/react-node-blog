const Router = require('express')
const router = new Router()
const commentController = require('../controller/commentController')
const middlewareAuth = require('../middleware/middlewareAuth')

router.post('/', middlewareAuth, commentController.create)
router.get('/:blogId', commentController.getAll)

module.exports = router