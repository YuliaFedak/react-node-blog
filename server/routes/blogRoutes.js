const Router = require('express')
const router = new Router()
const blogController = require('../controller/blogController')
const middlewareAuth = require('../middleware/middlewareAuth')

router.post('/', middlewareAuth, blogController.create)
router.get('/', blogController.getAll)
router.get('/category/:topic', blogController.getAllByTopic)
router.get('/:id', blogController.getOne)
router.get('/list/:userId', middlewareAuth, blogController.getAllBlogsByUserId)
router.get('/top/five', blogController.getTopFive)
router.put('/update/:id', middlewareAuth, blogController.updateOneBlog)
router.put('/:id', blogController.updateLike)
router.delete('/delete/:id', middlewareAuth, blogController.deleteBlog)

module.exports = router