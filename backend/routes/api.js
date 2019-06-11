const express = require('express')
const Router = express.Router()
const fs = require('fs')

const products = JSON.parse(fs.readFileSync('data.json'))

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

module.exports = Router
