/* api.js es un archvo que define los endpoints para nuestra API, usando el framework de node express, y su modulo de enrutamiento*/
const express = require('express') // importamos el modulo express
const Router = express.Router() // extraemos el modulo Router y creamos un objeto Router llamando a la función
const fs = require('fs') // fs nos permite interactuar con el sistema de archivos


const Banners = require('../models/Banners')
const Categories = require('../models/Categorias')
const Products = require('../models/Productos')

/*
  Todos los endpoints se crean llamando al metodo http dentro del router, puede sonar medio confuso, pero con un ejemplo va a quedar más claro

  Router.metodo('/endpoint', async (req, res) => res.send('hello world'))

  metodo puede ser cualquier metodo http valido (get, post, delete, put, patch)

  el primer parametro va a ser la ruta, y el segundo parametro un callback

  el callback acepta tres parametros, el primero es la request, el segundo es la respuesta, y el tercero el middleware, por ahora nos vamos a enfocar 
  en los primeros dos.
*/

Router.get('/products', async (req, res) => {
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    data = await Products.find({})
    success = data!==null?true:false
  }
  catch(error) {
    message = 'Ocurrió un error al intentar listar los productos'
    res.status(500)
  }
  res.json({success: success, message: message, data: data})
})

Router.get('/products/:id', async (req, res) => {
  const { id } = req.params
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
     data = await Products.findById(id)
     success = data!==null?true:false
     if(!success)
      res.status(404)
  }
  catch(error) {
    console.error(error)
    message = 'Ocurrio un error al obtener el producto'
    res.status(500)
  }

  res.json({status:status, message: message, data: data})
})

Router.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    data = await Products.findByIdAndDelete(id)
    success = data!==null?true:false
    if(!success) {
      res.status(404)
      message = 'No exite el producto indicado'
    }
  }
  catch(error) {
    message = "Ocurrió un error el intentar eliminar el producto"
    res.status(500)

  }

  res.json({status:status, message: message, data: data})

})

Router.post('/products', async (req, res) => {
  const {name, url, status} = req.body
  let data = null
  let message = ''
  let success = false
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    //Se toma del body el json enviado
    const {name, url, status} = req.body
    const product = new Products({
      name,
      url,
      status
    })
    data = await product.save()  
      //Se valida que haya insertado correctamente la información
    success = data!==null?true:false
  }
  catch(error) {
    console.error(error)
    message = 'Ocurrió un error al intentar guardar el producto'
    //Como hubo un problema en tiempo de ejecución se retorna un código 500
    res.status(500)
  }
  
  res.json({success: success, message: message, data: data})
})

Router.get('/banners', async (req, res) => {
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    data = await Banners.find({})
    success = data!==null?true:false
  }
  catch(error) {
    message = 'Ocurrió un error al intentar listar los banners'
    res.status(500)
  }
  res.json({success: success, message: message, data: data})
})

Router.get('/banners/:id', async (req, res) => {
  const { id } = req.params
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
     data = await Banners.findById(id)
     success = data!==null?true:false
     if(!success)
      res.status(404)
  }
  catch(error) {
    console.error(error)
    message = 'Ocurrio un error al obtener el banner'
    res.status(500)
  }

  res.json({status:status, message: message, data: data})
})

Router.delete('/banners/:id', async (req, res) => {
  const { id } = req.params
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    data = await Banners.findByIdAndDelete(id)
    success = data!==null?true:false
    if(!success) {
      res.status(404)
      message = 'No exite el banner indicado'
    }
  }
  catch(error) {
    message = "Ocurrió un error el intentar eliminar el banner"
    res.status(500)

  }

  res.json({status:status, message: message, data: data})

})

/**
 * Método para insertar un nuevo banner
 */
Router.post('/banners', async (req, res) => {
  let data = null
  let message = ''
  let success = false
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    //Se toma del body el json enviado
    const {name, url, status} = req.body
    const banner = new Banners({
        name,
        url,
        status
      })
      data = await banner.save()  
      //Se valida que haya insertado correctamente la información
      success = data!==null?true:false
  }
  catch(error) {
    console.error(error);
    message = 'Ocurrió un error al intentar guardar el banner'
    //Como hubo un problema en tiempo de ejecución se retorna un código 500
    res.status(500)
  }
  
  res.json({success: success, message: message, data: data})
})


Router.get('/categories', async (req, res) => {
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    data = await Categories.find({})
    success = data!==null?true:false
  }
  catch(error) {
    message = 'Ocurrio un error al intentar listar las categorias'
    res.status(500)
  }
  res.json({success: success, message: message, data: data})
})

Router.get('/categories/:id', async (req, res) => {
  const { id } = req.params
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
     data = await Categories.findById(id)
     success = data!==null?true:false
     if(!success)
      res.status(404)
  }
  catch(error) {
    console.error(error)
    message = 'Ocurrio un error al obtener la categoria'
    res.status(500)
  }

  res.json({status:status, message: message, data: data})
})

Router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params
  let data = null
  let status = false
  let message = ''
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    data = await Categories.findByIdAndDelete(id)
    success = data!==null?true:false
    if(!success) {
      res.status(404)
      message = 'No exite la categoria indicada'
    }
  }
  catch(error) {
    message = "Ocurrió un error el intentar eliminar la categoria"
    res.status(500)

  }

  res.json({status:status, message: message, data: data})
})

Router.post('/categories', async (req, res) => {
  let data = null
  let message = ''
  let success = false
  /**
   * try catch se usa para capturar cualquier error y evitar que explote la ejecución 
   * del código.
   */
  try {
    //Se toma del body el json enviado
    const {name, description} = req.body
    const category = new Categories({
        name,
        description
    })
    data = await category.save()  
      //Se valida que haya insertado correctamente la información
    success = data!==null?true:false
  }
  catch(error) {
    console.error(error);
    message = 'Ocurrió un error al intentar guardar la categoria'
    //Como hubo un problema en tiempo de ejecución se retorna un código 500
    res.status(500)
  }
  
  res.json({success: success, message: message, data: data})  
})

module.exports = Router // al final, exportamos nuestro objeto de router como un modulo
