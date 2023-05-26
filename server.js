const mongoose = require("mongoose")

const DB_HOST = "mongodb+srv://kogitonk:sU6LNGjohQsSqraE@cluster0.rv8clre.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', true)

const app = require('./app')

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(3000)
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1)
    })