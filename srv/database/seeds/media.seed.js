module.exports = async ({ Media }) => {
  await Media.create({
    name: "DeepWater",
    originalWidth: 2560,
    originalHeight: 1440,
    originalSize: 37264,
    //uuid: "29bed741-8ca1-4634-91de-c93cc7ef19f3"
    uuid: "00000000-0000-0000-0000-00000000000"
  })
}
