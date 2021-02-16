const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/api.routes')

const app = express()
const PORT = config.get('serverPORT')
const dbURL = config.get('dbURL')

app.use(express.json())
app.use('/api/auth/', authRouter)

const startApp = async () => {
  try {
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })
  } catch (error) {
    // console.log(error)
  }
}

startApp()
