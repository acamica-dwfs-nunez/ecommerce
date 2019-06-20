const { Schema, model, Types: {ObjectId} } = require('mongoose') // importamos el constructor de Schema y model

const VarianteSchema = new Schema({
    price: {type: Number},
    stock: {type: Number, required: true},
    size: {type: String, required: true},
    color: {type:String, required:true},
    images: [{ url: {type:String}}],
    principal: {type: Boolean, required: true}
})

module.exports = VarianteSchema // lo exportamos como un modulo. El primer parametro de model es el nombre de la Colection, y el segundo parametro es el Schema que hicimos antes