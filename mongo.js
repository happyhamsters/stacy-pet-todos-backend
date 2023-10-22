const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://aleksandrilinykhdev:${password}@cluster0.ctvwqtz.mongodb.net/?retryWrites=true&w=majority`
  

mongoose.set('strictQuery',false)
mongoose.connect(url)

const initialSchema = new mongoose.Schema({
    text: String
})

const Card = mongoose.model('Card', initialSchema)


Card.find({}).then(result => {
  mongoose.connection.close()
})