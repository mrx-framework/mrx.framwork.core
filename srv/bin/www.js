const http = require('http')
const https = require('https')
const { createServer } = require('../server')
const config = require('../../config')

const { app, readyPromise } = createServer()

readyPromise.then(() => {
  let server
  if (config.server.ssl) {
    server = https.createServer({
      cert: '',
      key: ''
    }, app)
  } else {
    server = http.createServer(app)
  }
  server.listen(config.server.port, () => {
    console.log(`Server is in mode '${config.mode}' and listening on Port: ${config.server.port}`)
  })
})
