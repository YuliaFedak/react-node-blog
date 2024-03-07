const {Blog} = require('../models/models')
const path = require("path");
const uuid = require('uuid')

class BlogController {
    async create(req, res, next) {
        const {title, topic, text, userId} = req.body
        const imgFile = req.files ? req.files.img : null;
        if (!title || !topic || !text || !imgFile) {
            return next('Введіть всі дані або додайте зображення!');
        }
        let fileName = uuid.v4() + ".jpg"
        await imgFile.mv(path.resolve(__dirname, '..', 'static', fileName))
        const blog = await Blog.create({title, topic, text, img: fileName, userId})
        return res.json(blog)
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        let offset = (page - 1) * limit;
        const blogs = await Blog.findAndCountAll({offset: offset, limit: limit})
        return res.json(blogs)
    }

    async getAllByTopic(req, res) {
        const {topic} = req.params
        const blogsByTopic = await Blog.findAll({where: {topic}})
        return res.json(blogsByTopic)
    }

    async getAllBlogsByUserId(req, res) {
        let {userId} = req.params
        const blogs = await Blog.findAll({where: {userId: userId}})
        return res.json(blogs)
    }

    async getOne(req, res) {
        const {id} = req.params
        const blog = await Blog.findOne({where: {id: id}})
        return res.json(blog)
    }

    async getTopFive(req, res) {
        const five = await Blog.findAll({ order: [['like', 'DESC']], limit: 5 });
        return res.json(five);
    }

    async updateOneBlog(req, res) {
        const {id} = req.params
        const {title, topic, text, userId} = req.body
        let fileName = null
        if (req.files && req.files.img) {
            const {img} = req.files
            fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        const blog = await Blog.findByPk(id)

        blog.title = title
        blog.topic = topic
        blog.text = text
        blog.userId = userId
        if (fileName) {
            blog.img = fileName
        }
        await blog.save()

        const updateUser = await Blog.findByPk(id)
        res.json(updateUser)
    }

    async deleteBlog(req,res) {
        const {id} = req.params
        await Blog.destroy({where: {id}})
        res.json({ message: "Successful delete" });
    }

    async updateLike (req, res) {
        const {id} = req.params
        const {like, dislike} = req.body
        const blog = await Blog.findByPk(id)
        blog.like = like
        blog.dislike = dislike
        await blog.save()
        const updateLike = await Blog.findByPk(id)
        res.json({"like" :updateLike.like, "dislike": updateLike.dislike})
    }

}

module.exports = new BlogController()