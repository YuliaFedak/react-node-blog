const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')
const middlewareAuth = require('../middleware/middlewareAuth')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get("/auth", middlewareAuth, userController.check)
router.get('/users', userController.getAll)
router.put("/update/:id", middlewareAuth, userController.updateOneUser)

module.exports = router