const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  user : {
    type: String,
    required: true,
  },
  concluido: {
    type: Boolean,
    default: false,
  },
  dataAdicao: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Todo', TodoSchema);

module.exports = TodoSchema;