const { Schema, model } = require('mongoose')

const CategoriaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

module.exports = model('Categories', CategoriaSchema)
