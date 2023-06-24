import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import ejs from 'ejs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import ConnectSessionSequelize from 'connect-session-sequelize'
import { sequelize } from './models/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const { SAM_PASSWORD, SESSION_SECRET } = process.env
const port = 3000
const app = express()
const SequelizeStore = ConnectSessionSequelize(session.Store)

const users = {
  sam: SAM_PASSWORD ?? 'password'
}

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  (user, password, done) => {
    if (users[user] && users[user] === password) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Username or password is incorrect' })
    }
  }
))

app.engine('.html', ejs.__express)
app.set('view engine', 'ejs')

const oneDay = 24 * 60 * 60 * 1000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.set('trust proxy', 1)
app.use(session({
  secret: SESSION_SECRET ?? 'secret',
  store: new SequelizeStore({ db: sequelize }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: oneDay
  }
}))

app.use(passport.authenticate('session'))
app.use(function (req, res, next) {
  const msgs = req.session.messages || []
  res.locals.messages = msgs
  res.locals.hasMessages = !!msgs.length
  req.session.messages = []
  next()
})

async function restrict (req, res, next) {
  try {
    const data = await req.sessionStore.get(req.sessionID)
    if (data.passport.user) {
      next()
    } else {
      req.session.messages = ['Must be authenticated']
      res.redirect('/login')
    }
  } catch (e) {
    req.session.messages = ['Must be authenticated']
    res.redirect('/login')
  }
}

app.get('/favicon.ico', (req, res) => res.status(204))

app.get('/', restrict, async (req, res) => {
  res.render('index.html', { user: req.user })
})

app.get('/login', (req, res) => {
  res.render('login.html')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}))

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
