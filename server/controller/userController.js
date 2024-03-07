const {User} =require('../models/models')
const jwt = require('jsonwebtoken')
const uuid = require("uuid");
const path = require("path");


const generateJwt = (id, nickname, email, password, avatar) => {
    return jwt.sign(
        {id, nickname, email, password, avatar},
        process.env.PRIMARY_KEY,
        {expiresIn: '24h'}
        )
}
class UserController {
    async registration(req, res, next) {
        const {nickname, email, password} = req.body

        if(!email || !password) {
            return next("Введіть пароль і пошту")
        }
        const candidate = await User.findOne(
            {where: {email}}
        )

        if (candidate) {
            return next("Вже існує такий користувач")
        }

        const user = await User.create({nickname, email, password})
        const token = generateJwt(user.id,user.nickname, user.email, user.password, user.avatar)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body

        const user = await User.findOne({where:{email}})
        if (!user) {
            return next('Користувач не знайдений')
        }

        if (password !== user.password) {
            return next('Не правильний пароль')
        }
        const token = generateJwt(user.id, user.nickname, user.email, user.password, user.avatar)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.nickname, req.user.email, req.user.password, req.user.avatar)
        return res.json({token})
    }

    async getAll(req,res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async updateOneUser(req, res) {
        const {id} = req.params
        const {nickname, email, password} = req.body
        let fileName = null
        if (req.files && req.files.avatar) {
            const {avatar} = req.files
            fileName = uuid.v4() + ".jpg"
            await avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        const user = await User.findByPk(id)

        user.nickname = nickname
        user.email = email
        user.password = password
        if (fileName) {
            user.avatar = fileName
        }

        await user.save()

        const updateUser = await User.findByPk(id)

        return res.json(updateUser)

    }
}
module.exports = new UserController()