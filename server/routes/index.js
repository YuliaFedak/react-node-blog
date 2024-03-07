const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const blogRoutes = require('./blogRoutes')
const commentRoutes = require('./commentRoutes')
const replyRoutes = require('./replyRoutes')

router.use('/user', userRoutes)
router.use("/blog", blogRoutes)
router.use('/comment', commentRoutes)
router.use('/reply', replyRoutes)

module.exports = router