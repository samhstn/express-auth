import express from 'express'
import path from 'path'
import session from 'express-session'
import passport from 'passport'

const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
