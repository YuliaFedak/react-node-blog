const {Sequelize} = require('sequelize')

module.exports = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Вимагати SSL/TLS
            rejectUnauthorized: false // Не перевіряти сертифікат
        }
    },
});