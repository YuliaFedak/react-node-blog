const Router = require('express')
const router = new Router()
const replyController = require('../controller/replyController')
const middlewareAuth = require('../middleware/middlewareAuth')

router.post('/', middlewareAuth, replyController.create)
router.get('/:commentId', replyController.getAll)

module.exports = router