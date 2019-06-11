const { Schema, model } = require('mongoose') // importamos el constructor de Schema y model

const CategoriaSchema = new Schema({ // creamos nuestro Schema o esquema de Mongo, esta va a ser la plantilla de nuestro documento.
  name: { 
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

module.exports = model('Categories', CategoriaSchema) // lo exportamos como un modulo. El primer parametro de model es el nombre de la Colection, y el segundo parametro es el Schema que hicimos antes
