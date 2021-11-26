const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const port = process.env.PORT || 3000


//parse aplication/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const login = require('./controller/login')
app.post('/api/v1/login', login)

//verify registration code
const verifyCode = require('./controller/regControl')
app.post('/api/v1/verifycode', verifyCode)

//endpoints cyclist
const cyclists = require('./cyclists')              //cyclist.js
app.use('/api/v1/cyclists', cyclists)

const checkpoints = require('./checkpoints')      //checkpoints.js
app.use('/api/v1', checkpoints)

process.env.TZ = 'Asia/Jakarta'
app.listen(port, () => {
    console.log('Server started on port ' + port)
})