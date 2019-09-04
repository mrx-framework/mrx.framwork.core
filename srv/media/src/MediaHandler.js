const sharp = require("sharp")
const uuidv4 = require("uuid/v4")
const path = require("path")
const mkdirp = require("mkdirp-promise")

class MediaHandler {
  constructor (folderPath, info) {
    this.folderPath = folderPath
    this.info = info
    this.uuid = uuidv4()
  }

  _getOrientation () {
    const { orientation } = this.info
    return orientation
  }

  _getSizes () {
    return this._getOrientation === "landscape" ?
      [
        { name: "Thumbnail", size: 100 },
        { name: "Mobile", size: 480 },
        { name: "Display", size: 1024 },
        { name: "FullSize", size: 1920 }
      ] :
      [
        { name: "Thumbnail", size: 56 },
        { name: "Mobile", size: 270 },
        { name: "Display", size: 576 },
        { name: "FullSize", size: 1080 }
      ]
  }

  async resize (buffer) {
    const options = {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    }
    const fileNames = []
    for (var i = 0 ; i < this._getSizes().length; i++) {
      const sizeObject = this._getSizes()[i]
      const filename = this.fileName(sizeObject.name)
      const filepath = await this.filePath(filename)
      let _sharp
      if (this._getOrientation === "landscape")
        _sharp = sharp(buffer)
          .resize(sizeObject.size, null, options)
      else
        _sharp = sharp(buffer)
          .resize(null, sizeObject.size, options)

      await _sharp
        .webp()
        .toFile(filepath)
        fileNames.push(filename)
    }
    // eslint-disable-next-line no-undef
    return Promise.resolve(fileNames)
  }

  async save (buffer) {
    const response = await this.resize(buffer)
    console.log(response)
  }

  fileName (name) {
    return `${name}.webp`
  }

  async filePath(filename) {
    await mkdirp(`${this.folderPath}/${this.uuid}`)
    return path.resolve(`${this.folderPath}/${this.uuid}/${filename}`)
  }
}

module.exports = MediaHandler
