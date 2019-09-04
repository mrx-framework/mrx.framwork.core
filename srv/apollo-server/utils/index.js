const { Op, fn, col } = require("sequelize")

const QueryModel = async (model, page = 1, limit = 10, query = null, fields = [], where = {}, versionsEnabled = false) => {
  let results

  if (versionsEnabled) {
    const _maxVersions = await model.findAndCountAll({
      attributes: [ fn("max", col("version")), fn("max", col("id")) ],
      group: ["uuid"],
      raw: true
    })

    const _maxVersionIds = _maxVersions.rows.map(r => r["max(`id`)"])
    console.log(_maxVersionIds)

    results = await model.findAndCountAll({
      offset: ((page - 1) * limit) || 0,
      limit: limit || 10,
      where: {
        ...{
          id: {
            [Op.in]: _maxVersionIds
          }
        },
        ...where,
        ...(query ? {
          [Op.and]: query.split(" ").map(q => (q ? {
            [Op.or]: fields.map(field => ({ [field]: { [Op.like]: `${q}%` } }))
          }: {}))
        } : {})
      },
    })
  }
  else {
    results = await model.findAndCountAll({
      offset: ((page - 1) * limit) || 0,
      limit: limit || 10,
      where: {
        ...where,
        ...(query ? {
          [Op.and]: query.split(" ").map(q => (q ? {
            [Op.or]: fields.map(field => ({ [field]: { [Op.like]: `${q}%` } }))
          }: {}))
        } : {})
      },
    })
}

  return {
    page,
    limit,
    total: results.count,
    data: results.rows
  }
}

const QueryRelated = async (model, func, page = 1, limit = 10, query = null, fields = [], where = {}) => {
  const results = await model[func]({
    offset: ((page - 1) * limit) || 0,
    limit: limit,
    where: {
      ...where,
      ...(query ? {
        [Op.and]: query.split(" ").map(q => (q ? {
          [Op.or]: fields.map(field => ({ [field]: { [Op.like]: `${q}%` } }))
        }: {}))
      } : {})
    },
  })

  const _total = await model[func]({
    attributes: ["id"],
    where: {
      ...where,
      ...(query ? {
        [Op.and]: query.split(" ").map(q => (q ? {
          [Op.or]: fields.map(field => ({ [field]: { [Op.like]: `${q}%` } }))
        }: {}))
      } : {})
    },
    raw: true
  })

  const total = _total ? _total.length : 0

  return {
    page,
    limit,
    total,
    data: results
  }
}

module.exports = {
  QueryModel,
  QueryRelated
}
