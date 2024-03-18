const sequelize = require('../db')
const {DataTypes} = require("sequelize");
const {use} = require("express/lib/router");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING, allowNull: true}
})

const Blog = sequelize.define('blog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    topic: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    like: {type: DataTypes.INTEGER, defaultValue: 0},
    dislike: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment: {type: DataTypes.TEXT, allowNull: false},
})

const Reply = sequelize.define('reply', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    reply: {type: DataTypes.TEXT, allowNull: false},
})
User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Blog.hasMany(Comment)
Comment.belongsTo(Blog)

User.hasMany(Reply)
Blog.hasMany(Reply)
Comment.hasMany(Reply)

Reply.belongsTo(User)
Reply.belongsTo(Blog)
Reply.belongsTo(Comment)

module.exports = {
    User,
    Blog,
    Comment,
    Reply
}
