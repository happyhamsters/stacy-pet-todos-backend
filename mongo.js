const mongoose = require('mongoose')

const url = MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const initialSchema = new mongoose.Schema({
    text: String
})

const Card = mongoose.model('Card', initialSchema)


Card.find({}).then(result => {
  mongoose.connection.close()
})