const { QueryModel, QueryRelated } = require("../utils")

module.exports = {
  User: {
    permissions: (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getPermissions",
        page,
        limit,
        query,
        ["name", "slug"]
      )
    },
    roles: (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getRoles",
        page,
        limit,
        query,
        ["name", "slug"]
      )
    }
  },
  Permission: {
    users: async (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getUsers",
        page,
        limit,
        query,
        ["firstname", "lastname", "accountname", "email"]
      )
    },
    roles: (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getRoles",
        page,
        limit,
        query,
        ["name", "slug"]
      )
    }
  },
  Role: {
    users: async (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getUsers",
        page,
        limit,
        query,
        ["firstname", "lastname", "accountname", "email"]
      )
    },
    permissions: (parent, args) => {
      const { page, limit, query } = args
      return QueryRelated(
        parent,
        "getPermissions",
        page,
        limit,
        query,
        ["name", "slug"]
      )
    }
  },
  Query: {
    currentUser: (parent, args, { currentUser, User }) => {
      const { accountname } = currentUser
      return User.findOne({ where: { accountname } })
    },
    user: (parent, { id }, { User }) => {
      return User.findByPk(id)
    },
    users: (_, { page, limit, query }, { User }) => QueryModel(
      User,
      page,
      limit,
      query,
      ["firstname", "lastname", "accountname", "email"]
    ),
    role: (_, { id }, { Role }) => {
      return Role.findByPk(id)
    },
    roles: (_, { page, limit, query }, { Role }) => QueryModel(
      Role,
      page,
      limit,
      query,
      ["name", "slug", "description"]
    ),
    permission: (_, { id }, { Permission }) => {
      return Permission.findByPk(id)
    },
    permissions: (_, { page, limit, query }, { Permission }) => QueryModel(
      Permission,
      page,
      limit,
      query,
      ["name", "slug", "description"]
    ),
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      return await User.create(args)
    },
    updateUser: async (parent, args, { User }) => {
      await User.update(args, { where: { id: args.id } })
      return await User.findByPk(args.id)
    },
    destroyUsers: async(parent, { ids }, { User }) => {
      try {
        const usersToDestroy = await User.findAll({ where: { id: ids } })
        await User.destroy({ where: { id: ids } })
        return usersToDestroy
      } catch (e) {
        return []
      }
    },
    attachRoleToUser: async(_, { id, attach }, { Role, User }) => {
      const user = await User.findByPk(id)
      user.addRoles(attach)
      return await Role.findAll({ where: { id: attach } })
    },
    detachRolesFromUser: async(_, { id, detach }, { Role, User }) => {
      try {
        const user = await User.findByPk(id)
        user.removeRoles(detach)
        return await Role.findAll({ where: { id: detach } })
      } catch (e) {
        return [-1]
      }
    },
    attachPermissionToUser: async(_, { id, attach }, { User, Permission }) => {
      const user = await User.findByPk(id)
      user.addPermissions(attach)
      return await Permission.findAll({ where: { id: attach } })
    },
    detachPermissionsFromUser: async(_, { id, detach }, { User, Permission }) => {
      try {
        const user = await User.findByPk(id)
        user.removePermissions(detach)
        return await Permission.findAll({ where: { id: detach } })
      } catch (e) {
        return [-1]
      }
    },

    createRole: async (_, args, { Role }) => {
      return await Role.create(args)
    },
    updateRole: async (_, args, { Role }) => {
      await Role.update(args, { where: { id: args.id } })
      return await Role.findByPk(args.id)
    },
    destroyRoles: async(_, { ids }, { Role }) => {
      try {
        const rolesToDestroy = await Role.findAll({ where: { id: ids } })
        await Role.destroy({ where: { id: ids } })
        return rolesToDestroy
      } catch (e) {
        return []
      }
    },
    attachUserToRole: async(_, { id, attach }, { Role, User }) => {
      const role = await Role.findByPk(id)
      role.addUsers(attach)
      return await User.findAll({ where: { id: attach } })
    },
    detachUsersFromRole: async(_, { id, detach }, { Role, User }) => {
      try {
        const role = await Role.findByPk(id)
        role.removeUsers(detach)
        return await User.findAll({ where: { id: detach } })
      } catch (e) {
        return [-1]
      }
    },
    attachPermissionToRole: async(_, { id, attach }, { Role, Permission }) => {
      const role = await Role.findByPk(id)
      role.addPermissions(attach)
      return await Permission.findAll({ where: { id: attach } })
    },
    detachPermissionsFromRole: async(_, { id, detach }, { Role, Permission }) => {
      try {
        const role = await Role.findByPk(id)
        role.removePermissions(detach)
        return await Permission.findAll({ where: { id: detach } })
      } catch (e) {
        return [-1]
      }
    },

    attachUserToPermission: async(_, { id, attach }, { Permission, User }) => {
      const permission = await Permission.findByPk(id)
      permission.addUsers(attach)
      return await User.findAll({ where: { id: attach } })
    },
    detachUsersFromPermission: async(_, { id, detach }, { Permission, User }) => {
      try {
        const permission = await Permission.findByPk(id)
        permission.removeUsers(detach)
        return await User.findAll({ where: { id: detach } })
      } catch (e) {
        return [-1]
      }
    },
    attachRoleToPermission: async(_, { id, attach }, { Permission, Role }) => {
      const permission = await Permission.findByPk(id)
      permission.addRoles(attach)
      return await Role.findAll({ where: { id: attach } })
    },
    detachRolesFromPermission: async(_, { id, detach }, { Permission, Role }) => {
      try {
        const permission = await Permission.findByPk(id)
        permission.removeRoles(detach)
        return await Role.findAll({ where: { id: detach } })
      } catch (e) {
        return [-1]
      }
    },


  }
}
