const {Reply} = require('../models/models')

class ReplyController {
    async create(req, res) {
        const {reply, userId, blogId, commentId} = req.body
        const replies = await Reply.create({reply, userId, blogId, commentId})
        return res.json(replies)
    }

    async getAll(req, res) {
        let {commentId} = req.params
        const reply = await Reply.findAll({where: {commentId: commentId}})
        return res.json(reply)
    }
}

module.exports = new ReplyController()