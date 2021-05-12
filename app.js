const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')

const DBconnection = require('./config/db.js')

dotenv.config({ path: './config/.env' })

DBconnection()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use((req, res, next) => {
  res.json({ title: 'hello world' })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`API Running on http://localhost:${PORT}`.rainbow.bold)
})