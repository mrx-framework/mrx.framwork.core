const passport = require("passport")
const session = require("express-session")
const { localStrategy, configureLocalRoutes } = require("./strategies/local")
// const config = require("../../config")

const configurePassport = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(localStrategy)

  app.use(session({
    name: "mrx.framework",
    secret: "129731286812==Df09a87ds9fadAD79asdf!0987df",
    resave: true,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 60 * 8 // 8h
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  configureLocalRoutes(passport, app)

  return passport
}

module.exports = configurePassport
