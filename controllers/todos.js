const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItemsActive = await Todo.find({userId:req.user.id,completed: false})
            const todoItemsCompleted = await Todo.find({userId:req.user.id,completed: true})
            const itemsLeft = todoItemsActive.length;
            //const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            //res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
            res.render('todos.ejs', {todosActive: todoItemsActive, todosCompleted: todoItemsCompleted, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, group: req.body.group, dueDate: req.body.dueDate, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            console.log(req.body)
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    