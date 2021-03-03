const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const cors = require('cors');
const path = require('path')
const fileMiddleware = require("./middlewares/files.middleware");
const staticMiddleware = require('./middlewares/static.middleware')
const fs = require("fs");

const app = express()
const PORT = config.get('serverPORT')
const dbURL = config.get('dbURL')

// const corsOptions = {
//   origin: 'https://react-mern-c-lient.herokuapp.com',
//   optionsSuccessStatus: 200
// }


// app.use(cors({credentials: true, origin: true}));
app.use(cors());

app.use('/', express.static( path.join(__dirname, 'static') ))
console.log(path.join(__dirname, 'static'))
app.use(fileUpload({}))
app.use(fileMiddleware(path.resolve(__dirname, 'files')))
app.use(staticMiddleware(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use('/api/auth/', authRouter)
app.use('/api/files/', fileRouter)

const startApp = async () => {
  try {

    const filesPath = path.resolve(__dirname, 'files')
    const staticPath = path.resolve(__dirname, 'static')

    console.log('filesPath', filesPath)

    if (!fs.existsSync(filesPath)) {
      fs.mkdirSync(path.resolve(filesPath))
    }

    if (!fs.existsSync(staticPath)) {
      fs.mkdirSync(path.resolve(staticPath))
    }

    await mongoose
      .connect( dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false, tls: true })
      .then(() => console.log( 'Database Connected' ))
      .catch(err => console.log( err ));

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
