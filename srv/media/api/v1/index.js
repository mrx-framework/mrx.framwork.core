const { models } = require("../../../database")
const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const multer = require("multer")
const Promise = require("promise")
const rimraf = require("rimraf")

const rootFilePath = path.join(__dirname, "../../files")
var upload = multer({ dest: `${rootFilePath}/temp` })


const storeMedia = async image => {
  const { Media } = models
  try {
    const { width, height } = await sharp(image.path).metadata()
    const media = await Media.create({
      name: image.originalname,
      originalWidth: width,
      originalHeight: height
    })

    const fileName = `${media.uuid}.webp`
    const filePath = `${rootFilePath}/${fileName}`
    await sharp(image.path)
      .webp()
      .toFile(filePath)

    return Promise.resolve(media)
  }
  catch (exception) {
    return Promise.reject(exception)
  }
}

const configureMediaApiRoutes = app => {
  const { Media } = models

  app.get("/api/media/v1", async (req, res) => {
    try {
      const medias = await Media.findAndCountAll()
      return res.json(medias)
    }
    catch (exception) {
      console.log(exception)
    }
  })

  app.get("/api/media/v1/:uuid", async (req, res) => {
    // GET SPECIFIC MEDIA
    try {
      const { uuid } = req.params

      const width = req.query.width ? parseInt(req.query.width) : null
      const height = req.query.height ? parseInt(req.query.height) : null
      const media = await Media.findOne({ where: { uuid } })

      if (media) {
        const fileName = `${uuid}.webp`
        const filePath = `${rootFilePath}/${fileName}`

        fs.readFile(filePath, async (err, data) => {
          if (err) {
            res.status(404).send("FILE NOT FOUND!")
          }
          else {
            const media = await sharp(data)
              .resize(width, height)
              .webp()
              .toBuffer()
            res.contentType("webp")
            res.send(media)
          }
          res.end()
        })
      }
    }
    catch (exception) {
      console.log(exception)
    }
  })

  app.post("/api/media/v1", upload.array("images", 10), async (req, res) => {
    const { files } = req
    if (files) {
      await Promise.all(
        files.map(async image => await storeMedia(image))
      )
      rimraf(`${rootFilePath}/temp/*`, (e) => {console.log(e)})
      return res.json({ success: true })
    }
  })
}

module.exports = configureMediaApiRoutes
