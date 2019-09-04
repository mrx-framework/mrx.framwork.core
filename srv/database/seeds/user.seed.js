module.exports = async ({ User, Role, Permission }) => {

  await Role.bulkCreate([
    {
      name: "Administrators",
      slug: "super-admins",
      description: "This Role is for Super Admins only",
      protected: 1
    }
  ])

  await Permission.bulkCreate([
    {
      name: "Super Admin",
      slug: "super.admin",
      description: "This permission has access to everything",
      protected: 1
    },
    {
      name: "Create Users",
      slug: "create.users",
      description: "Allow to create users"
    },
    {
      name: "Edit Users",
      slug: "edit.users",
      description: "Allow to edit users"
    },
    {
      name: "View Users",
      slug: "view.users",
      description: "Allow to view users"
    },
    {
      name: "Destroy Users",
      slug: "destroy.users",
      description: "Allow to destroy users"
    },
  ])

  await User.bulkCreate([
    {
      accountname: "admin",
      firstname: "Admin",
      lastname: "User",
      email: "admin@local.de",
      password: "passw0rd"
    }
  ], { individualHooks: true })

  const user = await User.findByPk(1)
  user.setRoles([1])
  user.setPermissions([1])

  const role = await Role.findByPk(1)
  role.setPermissions([1])
  return role

}
