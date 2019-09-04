const { QueryModel, QueryRelated } = require("../utils")

module.exports = {
  NavLocation: {
    navigations: (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getNavigations",
        page,
        limit,
        query,
        ["text", "slug", "path"]
      )
    }
  },
  Query: {
    displayNavigation: async (root, { location, parent }, { NavLocation, Navigation }) => {
      const { navigations } = await NavLocation.findOne({
        where: {
          name: location
        },
        include: [
          {
            model: Navigation,
            where: { navigation_id: parent },
            include: [
              { model: Navigation, as: "childs" },
            ]
          }
        ],
        order: [
          [Navigation, "order", "asc"],
          [{ model: Navigation }, { model: Navigation, as: "childs" }, "order", "asc"]
        ]
      })
      return navigations
    },

    navlocation: (parent, { id }, { NavLocation }) => {
      return NavLocation.findByPk(id)
    },
    navlocations: (_, { page, limit, query }, { NavLocation }) => QueryModel(
      NavLocation,
      page,
      limit,
      query,
      ["name"],
      { hidden: false },
    ),

    navigation: (parent, { id }, { Navigation }) => {
      return Navigation.findByPk(id)
    },
    navigations: (_, { page, limit, query }, { Navigation }) => QueryModel(
      Navigation,
      page,
      limit,
      query,
      ["text", "slug", "path"],
    ),
  },
  Mutation: {
    createNavigationLocation: async (_, args, { NavLocation }) => {
      return await NavLocation.create(args)
    },
    updateNavigationLocation: async (_, args, { NavLocation }) => {
      await NavLocation.update(args, { where: { id: args.id } })
      return await NavLocation.findByPk(args.id)
    },
    destroyNavigationLocations:  async(_, { ids }, { NavLocation }) => {
      try {
        const navLocationsToDestroy = await NavLocation.findAll({ where: { id: ids } })
        await NavLocation.destroy({ where: { id: ids } })
        return navLocationsToDestroy
      } catch (e) {
        return []
      }
    },

    createNavigation: async (_, args, { Navigation }) => {
      return await Navigation.create(args)
    },
    updateNavigation: async (_, args, { Navigation }) => {
      await Navigation.update(args, { where: { id: args.id } })
      return await Navigation.findByPk(args.id)
    },
    destroyNavigations:  async(_, { ids }, { Navigation }) => {
      try {
        const navigationsToDestroy = await Navigation.findAll({ where: { id: ids } })
        await Navigation.destroy({ where: { id: ids } })
        return navigationsToDestroy
      } catch (e) {
        return []
      }
    }
  }
}
