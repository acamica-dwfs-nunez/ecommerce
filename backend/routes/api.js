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
  res.json(await Products.find({}))
})

Router.get('/products/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Products.findById(id))
})

Router.post('/products', async (req, res) => {
  const {name, url, status} = req.query
  const product = new Products({
      name,
      url,
      status
    })
  res.json(await product.save())
})

Router.get('/banners', async (req, res) => {
  res.json(await Banners.find({}))
})

Router.get('/banners/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Banners.findById(id))
})

Router.delete('/banners/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Banners.findByIdAndDelete(id))
})

Router.post('/banners', async (req, res) => {
  const {name, url, status} = req.query
  const banner = new Banners({
      name,
      url,
      status
    })
  res.json(await banner.save())
})


Router.get('/categories', async (req, res) => {
  res.json(await Categories.find({}))
})

Router.get('/categories/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Categories.findById(id))
})

Router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Categories.findByIdAndDelete(id))
})

Router.post('/categories', async (req, res) => {
  const {name, description} = req.query
  const category = new Categories({
      name,
      description
    })
  res.json(await category.save())
})

module.exports = Router // al final, exportamos nuestro objeto de router como un modulo
