const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const linkRoutes = require('./routes/linkRoutes')
const redirectRoutes = require('./routes/redirectRoutes')

const app = express()

// для распознавания входящего объекта запроса как объекта JSON
app.use(express.json({extended: true}))

// маршрутизация
app.use('/api/auth', authRoutes)
app.use('/api/link', linkRoutes)
app.use('/t', redirectRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile((path.resolve(__dirname, 'client', 'build', 'index.html')))
  })
}

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

