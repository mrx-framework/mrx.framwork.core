const { QueryModel, QueryRelated } = require("../utils")

module.exports = {
  Form: {
    formfields: (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getFormfields",
        page,
        limit,
        query,
        ["label"]
      )
    },
    formdatas: (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getFormdatas",
        page,
        limit,
        query,
        ["data"]
      )
    }
  },
  Query: {
    displayForm: async (parent, { id }, { Form }) => {
      const form = await Form.findByPk(id)
      const fields = await form.getFormfields()
      const data = await form.getFormdatas()
      form.formfields = fields
      form.formdatas = data
      return form
    },
    form: (parent, { id }, { Form }) => {
      return Form.findByPk(id)
    },
    forms: (_, { page, limit, query }, { Form }) => QueryModel(
      Form,
      page,
      limit,
      query,
      ["name"]
    ),

    formField: (parent, { id }, { FormField }) => {
      return FormField.findByPk(id)
    },
    formFields: (_, { page, limit, query }, { FormField }) => QueryModel(
      FormField,
      page,
      limit,
      query,
      ["label"],
    ),

    formData: (parent, { id }, { FormData }) => {
      return FormData.findByPk(id)
    },
    formDatas: (parent, { page, limit, query }, { FormData }) => {
      FormData,
      page,
      limit,
      query,
      ["data"]
    }
  },
  Mutation: {
    createForm: async (_, args, { Form }) => {
      return await Form.create(args)
    },
    updateForm: async (_, args, { Form }) => {
      await Form.update(args, { where: { id: args.id } })
      return await Form.findByPk(args.id)
    },
    destroyForms:  async(_, { ids }, { Form }) => {
      try {
        const formsToDestroy = await Form.findAll({ where: { id: ids } })
        await Form.destroy({ where: { id: ids } })
        return formsToDestroy
      } catch (e) {
        return []
      }
    },

    createFormField: async (_, args, { FormField }) => {
      return await FormField.create(args)
    },
    updateFormField: async (_, args, { FormField }) => {
      await FormField.update(args, { where: { id: args.id } })
      return await FormField.findByPk(args.id)
    },
    destroyFormFields:  async(_, { ids }, { FormField }) => {
      try {
        const formFieldsToDestroy = await FormField.findAll({ where: { id: ids } })
        await FormField.destroy({ where: { id: ids } })
        return formFieldsToDestroy
      } catch (e) {
        return []
      }
    },

    createFormData: async (_, args, { FormData }) => {
      return await FormData.create(args)
    },
    updateFormData: async (_, args, { FormData }) => {
      await FormData.update(args, { where: { id: args.id } })
      return await FormData.findByPk(args.id)
    },
    destroyFormDatas:  async(_, { ids }, { FormData }) => {
      try {
        const formDatasToDestroy = await FormData.findAll({ where: { id: ids } })
        await FormData.destroy({ where: { id: ids } })
        return formDatasToDestroy
      } catch (e) {
        return []
      }
    }
  }
}
