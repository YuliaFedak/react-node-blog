require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const path = require("path");

const PORT = process.env.PORT || 7000;

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json({message: "Working"})
})



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()