const { Schema, model, Types: {ObjectId} } = require('mongoose') // importamos el constructor de Schema y model
const Categories = require('./Categorias')
const Variants = require('./Variantes')

const ProductoSchema = new Schema({ // creamos nuestro Schema o esquema de Mongo, esta va a ser la plantilla de nuestro documento.
    name: { 
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    variants: [Variants],
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date },
    deleted_at: { type: Date },
    categories: [{categoryid: {type: ObjectId}}]
  })
  
  module.exports = model('Products', ProductoSchema) // lo exportamos como un modulo. El primer parametro de model es el nombre de la Colection, y el segundo parametro es el Schema que hicimos antes
  