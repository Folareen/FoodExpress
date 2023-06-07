const express = require("express")
require("dotenv").config()
const connectToDB = require('./src/utils/connectToDB')
const authRouter = require('./src/routes/auth')
const notFound = require('./src/middlewares/notFound')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', authRouter)
app.use(notFound)

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectToDB(process.env.MONGO_URI)
        app.listen(PORT,
            () => {
                console.log(`Server started at ${PORT} `)
            }
        )
    } catch (error) {
        console.log('Unable to start server', error.message)
    }
}

startServer()