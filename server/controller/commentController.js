const {Comment} = require('../models/models')

class CommentController {
    async create(req,res) {
        const {comment, userId, blogId} = req.body
        const comments = await Comment.create({comment, userId, blogId})
        return res.json(comments)
    }

    async getAll(req, res) {
        let {blogId} = req.params
        const comments = await Comment.findAndCountAll({where: {blogId: blogId}})
        return res.json(comments)
    }
}

module.exports = new CommentController()