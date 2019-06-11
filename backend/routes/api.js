/* api.js es un archvo que define los endpoints para nuestra API, usando el framework de node express, y su modulo de enrutamiento*/

const express = require('express') // importamos el modulo express
const Router = express.Router() // extraemos el modulo Router y creamos un objeto Router llamando a la función
const fs = require('fs') // fs nos permite interactuar con el sistema de archivos

const products = JSON.parse(fs.readFileSync('data.json')) // con fs.readFileSync, leemos un archivo JSON de forma SINCRONICA, esto quiere decir que va a bloquear nuestro main thread mientras ejecute esta acción, con JSON.parse transformamos ese JSON en un objeto de JS

/*
  Todos los endpoints se crean llamando al metodo http dentro del router, puede sonar medio confuso, pero con un ejemplo va a quedar más claro

  Router.metodo('/endpoint', async (req, res) => res.send('hello world'))

  metodo puede ser cualquier metodo http valido (get, post, delete, put, patch)

  el primer parametro va a ser la ruta, y el segundo parametro un callback

  el callback acepta tres parametros, el primero es la request, el segundo es la respuesta, y el tercero el middleware, por ahora nos vamos a enfocar 
  en los primeros dos.
*/

Router.get('/products', async (req, res) => {
  res.json(products)
})

Router.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const results = products.filter(product => product.id == id)
  res.json(results)
})

Router.post('/products', async (req, res) => {
  const { body } = req
  products.push(body)
  fs.writeFileSync('data.json', JSON.stringify(products))
  res.json(products)
})

module.exports = Router // al final, exportamos nuestro objeto de router como un modulo
