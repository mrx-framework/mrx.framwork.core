const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const multer = require("multer")

const MediaHandler = require("./src/MediaHandler")
const configureMediaApiRoutes = require("./api/v1")

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  }
})

const resize = (filePath, format, width, height) => {
  const _path = path.join(__dirname, filePath)
  const readStream = fs.createReadStream(_path)

  let transform = sharp()

  if (format) {
    transform = transform.toFormat(format)
  }

  if (width || height) {
    transform = transform.resize(width, height)
  }


  return readStream.pipe(transform)
}


const configureMediaGateway = (app, express) => {
  app.use("/staticmedia", express.static(__dirname + "/files"))

  configureMediaApiRoutes(app)

  /*
  app.get("/media", (req, res) => {
    const width = req.query.width ? parseInt(req.query.width) : null
    const height = req.query.height ? parseInt(req.query.height) : null
    const format = req.query.format || "png"

    res.type(`image/${format}`)

    resize(
      "/files/header.jpg",
      format,
      width,
      height).pipe(res)
  })

  app.post("/media/upload", upload.single("data"), async (req, res) => {
    const mediaPath = path.join(__dirname, "/files")
    const mediaUpload = new MediaHandler(mediaPath, req.body)

    if (!req.file) {
      return res.status(401).json({ error: "Please provide an image" })
    }
    const fileName = await mediaUpload.save(req.file.buffer)
    return res.json(req.body)
  })
  */
}

module.exports = configureMediaGateway
