const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
   todo: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
