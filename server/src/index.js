const express = require('express')
const { connection , PORT } = require('./Config/db')
const cors = require('cors')
const UserController = require('./Controllers/user.controller')
const TaskController = require('./Controllers/task.controller')

const app = express()

app.use(express.json())
app.use(cors('*'))

app.get('/', (req,res) => {
    res.send({msg:'API is Live!'})
})

app.use('/user',UserController)
app.use('/api',TaskController)

app.listen(PORT, async () => {
    try {
        await connection
        console.log('Connected to DB')
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on PORT: ${PORT}`)
})