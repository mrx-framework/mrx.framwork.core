const { QueryModel } = require("../utils")
const { Op } = require("sequelize")
// const moment = require("moment")

module.exports = {
  Component: {
    childs: (parent, _, { Component }) => Component.findAll({ where: { component_id: parent.id }, order: [["order"]] } )
  },
  Query: {
    routes: (root, _, { Page }) => Page.findAll(),
    page: (parent, { id }, { Page }) => {
      return Page.findByPk(id)
    },
    pages: (_, { page, limit, query }, { Page }) => QueryModel(
      Page,
      page,
      limit,
      query,
      ["title", "slug", "path"],
      { hidden: false },
      true
    ),
    displayPage: async (parent, { id, path }, { Page, Component }) => {
      let where = id ?
        { id } :
        { path }
      let _order = path ? [["version", "DESC"]] : []

      return await Page.findOne({
        where,
        order: _order,
        include: [{
          model: Component,
          where: {
            component_id: { [Op.eq]: null },
          },
          required: false
        }],
      })
    }
  },
  Mutation: {
    createPage: async (parent, args, { Page } ) => {
      return await Page.create(args)
    },
    updatePage: async(parent, args , { Page }) => {
      // TODO TIME IS FUCKING SHIT
      let createdAt = new Date(0)
      createdAt.setUTCMilliseconds(args.created_at)

      const pagePayload = {
        title: args.title,
        slug: args.slug,
        path: args.path,
        uuid: args.uuid,
        hidden: args.hidden || false,
        isDraft: args.isDraft,
        publishingDate: args.publishingDate,
        createdAt: createdAt.toISOString().slice(0, 19).replace("T", " ")
      }

      //console.log(moment().utc(args.created_at).format("YYYY-MM-DD HH:mm:ss"))

      return await Page.create(pagePayload, { raw: true })

    },
    attachComponentToPage: async(_, { id, attach }, { Page, Component }) => {
      const page = await Page.findByPk(id)
      page.addComponents(attach)
      return await Component.findAll({ where: { id: attach } })
    },
    createComponent: async (parent, args, { Component }) => {
      const payload = {
        name: args.name,
        title: args.title,
        properties: args.properties,
        content: args.content,
        order: args.order,
        hidden: args.hidden
      }
      const component = await Component.create(payload)
      if (args.pageId) {
        component.setPage(args.pageId)
      }
      if (args.componentId) {
        const parentComponent = await Component.findByPk(args.componentId)
        parentComponent.addChilds([component.id])
        //component.addChilds([args.componentId])
      }
      return component
    }
  },
  //attachComponentToPage: async (parent, { args }, {  })
}
