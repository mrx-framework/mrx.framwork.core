const { Strategy } = require("passport-local")
const db = require("../../database")
const bcrypt = require("bcrypt")

const configureLocalRoutes = (passport, app) => {
  app.post(
    "/local/login",
    passport.authenticate("local"),
    (req, res) =>{
      console.log(req.user)
      // req.login()
      res.json({ success: true })
    }
  )
  app.get(
    "/api/me",
    (req, res) =>{
      res.json({ success: req.user })
    }
  )
  app.get("/local/logout", (req, res) => {
    req.logout()
    res.redirect("/login")
  })
}

const localStrategy = new Strategy(
  async (username, password, done) => {
    const { User } = db.models
    try {
      const user = await User.findOne({
        where: { accountname: username },
        attributes: ["accountname", "password"]
      })
      if (!user) return done(null, false)
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        const _user = user.toJSON()
        delete _user.password
        done(null, _user)
      } else {
        done(null, false)
      }
    } catch (e) {
      return done(e)
    }
  }
)

module.exports = {
  localStrategy,
  configureLocalRoutes
}
