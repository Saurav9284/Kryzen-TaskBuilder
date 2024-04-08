const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(process.env.MONGO_URI)

const PORT = process.env.PORT

const JWT_SECERT = process.env.JWT_SECERT

module.exports = { connection , PORT , JWT_SECERT}