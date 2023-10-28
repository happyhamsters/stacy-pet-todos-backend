const Todo = require('../models/todo');

const initialTodos = [
    {
        "title": "Hello world!",
        "text": "Hello world",
        "isDone": false,
        "id": "6538ae1536fc8391ff88176f"
    },
    {
        "title": "new",
        "text": "to",
        "isDone": false,
        "id": "653a254135d26f2360d45dec"
    }
]

const getNonExistingId = async () => {
    const todo = new Todo({ content: 'willremovethissoon' });
    await todo.save();
    await todo.deleteOne();

    return todo._id.toString();
};

const getAllTodosFromDb = async () => {
    const todos = await Todo.find({});
    return todos.map((todo) => todo.toJSON());
};

module.exports = {
    getNonExistingId,
    initialTodos,
    getAllTodosFromDb,
};