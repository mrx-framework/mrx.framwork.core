const path = require("path")
const webpack = require("webpack")
const MFS = require("memory-fs")
const clientConfig = require("./webpack.client.config")
const serverConfig = require("./webpack.server.config")

const setupServer = () => {
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  return serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach((err) => console.error(err))
    stats.warnings.forEach((err) => console.warn(err))
    const readFile = (file) => mfs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    bundle = JSON.parse(readFile('vue-ssr-bundle.json'))
  })
}

const setupClient = (app) => new Promise((resolve) => {
  // modify client config to work with hot middleware
  clientConfig.entry.app = ["webpack-hot-middleware/client", clientConfig.entry.app]
  clientConfig.output.filename = "[name].js"
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require("webpack-dev-middleware")(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)


  clientCompiler.plugin("done", () => {
    const fs = devMiddleware.fileSystem
    const readFile = (file) => fs.readFileSync(path.join(clientConfig.output.path, file), "utf-8")
    clientManifest = JSON.parse(readFile("vue-ssr-client-manifest.json"))
    resolve()
  })

  // hot middleware
  app.use(require("webpack-hot-middleware")(clientCompiler))
})

const setupDevServer = (app, cb) => new Promise(async (resolve) => {
  setupServer()
  await setupClient(app)
  cb(bundle, {clientManifest})
  resolve()
})

module.exports = setupDevServer
