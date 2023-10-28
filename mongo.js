const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const todoSchema = new mongoose.Schema({
    title: String,
    text: String,
    isDone: Boolean
})

const Todo = mongoose.model('Todo', todoSchema)


Todo.find({}).then(result => {
  mongoose.connection.close()
})