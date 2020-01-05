const mongoose = require('mongoose');

const Todo = mongoose.model('Todo');

module.exports = {
  async add(req, res){
    const todo = await Todo.create(req.body);
    return res.json(todo)
  },
  async list(req, res){
    const todo = await Todo.find({user: req.params.user});
    return res.json({todo, user: req.user._id})
  },  
  async show(req, res){
    const todo = await Todo.findById(req.params.id);
    return res.json(todo)
  },
  async delete(req, res){
    await Todo.findByIdAndDelete(req.params.id);
    return res.send("ok");
  },  
  async update(req, res){
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(todo);
  },
}