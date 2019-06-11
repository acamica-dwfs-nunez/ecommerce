const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Categories = require('./models/Categorias')

const api = require('./routes/api')

const PORT = process.env.PORT || 5000 // definimos el puerto como una constante, si el puerto no está definido como una variable de entorno, usamos 5000 como fallback

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, startServer) // nos conectamos a nuestra DB, las configuraciones estan en nuestro archivo .env, una vez que inicia, o crashea, llama al callback "startServer"

const app = express() // iniciamos la app de express

app.use(bodyParser.json()) // utilizamos un middleware para parsear los JSON

app.use('/api', api) // montamos las rutas de api, como hijo de la ruta /api. Para acceder a nuestros endpoints tendriamos que escribir www.example.com/api/products por ejemplo

async function startServer(err) {
  if (err) { // detecta si hay un error, si hay error, crashea la app
    throw err
  }
  console.log('Connected to DB') // sino, continua con la rutina
  app.listen(PORT, () => { // inicia el servidor
    console.log(`Server started at port: ${PORT}`) 
  })


  // esta parte muestra como crear un documento de mongodb
  const categoria = new Categories({
    name: 'Shirts',
    description: 'remeritas piola'
  })

  await categoria.save() // acá lo guardamos

  console.log(await Categories.find({})) // acá vemos el listado de objetos y le hacemos un console.log
}
