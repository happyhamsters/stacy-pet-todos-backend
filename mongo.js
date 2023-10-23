const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const cardSchema = new mongoose.Schema({
    title: String,
    text: String,
    isDone: Boolean
})

const Card = mongoose.model('Card', cardSchema)s


Card.find({}).then(result => {
  mongoose.connection.close()
})