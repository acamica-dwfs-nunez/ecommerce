const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Categories = require('./models/Categorias')

const api = require('./routes/api')
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, startServer)

const app = express()

app.use(bodyParser.json())

app.use('/api', api)

async function startServer(err) {
  if (err) {
    throw err
  }
  console.log('Connected to DB')
  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
  })

  const categoria = new Categories({
    name: 'Shirts',
    description: 'remeritas piola'
  })

  await categoria.save()

  console.log(await Categories.find({}))
}
