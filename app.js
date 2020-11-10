const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

const app = express()

// для распознавания входящего объекта запроса как объекта JSON
app.use(express.json({extended: true}))

// маршрутизация
app.use('/api/auth', authRoutes)

const PORT = config.get('port') || 5000

async function start() {
  try {
    //
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })


    app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))

  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

