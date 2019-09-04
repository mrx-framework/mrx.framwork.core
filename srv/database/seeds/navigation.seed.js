const { Op } = require("sequelize")
const config = require("../../../config")
const locales = require(`../../../src/locales/${config.locale}`)

module.exports = async ({ Navigation, NavLocation }) => {
  await NavLocation.bulkCreate([
    {
      name: "admin-menu",
      hidden: true,
    },
    {
      name: "main-menu",
      hidden: false
    }
  ])


  await Navigation.bulkCreate([
    {
      text: locales.navigation.dashboard,
      slug: "admin-dashboard",
      path: "/admin",
      order: 1,
      icon: "mdi-view-dashboard",
      hidden: "false"
    },
    {
      text: locales.navigation.pages,
      slug: "admin-pages",
      path: "/admin/pages",
      order: 2,
      icon: "mdi-book-open-page-variant",
      hidden: "false"
    },
    {
      text: locales.navigation.all_pages,
      slug: "admin-pages-all",
      path: "/admin/pages",
      order: 1,
      icon: "mdi-book-open-page-variant",
      hidden: "false"
    },
    {
      text: locales.navigation.new_page,
      slug: "admin-pages-new",
      order: 2,
      path: "/admin/pages/action",
      icon: "mdi-book-open-page-variant",
      hidden: "false"
    },
    {
      text: locales.navigation.blog,
      slug: "admin-blog",
      path: "/admin/blog",
      order: 3,
      icon: "mdi-file-document-edit-outline",
      hidden: "false"
    },
    {
      text: locales.navigation.all_posts,
      slug: "admin-blog-all",
      path: "/admin/blog",
      order: 1,
      icon: "mdi-file-document-edit-outline",
      hidden: "false"
    },
    {
      text: locales.navigation.new_post,
      slug: "admin-blog-new",
      path: "/admin/blog/action",
      order: 2,
      icon: "mdi-file-document-edit-outline",
      hidden: "false"
    },
    {
      text: locales.navigation.blog_categories,
      slug: "admin-blog-category",
      path: "/admin/blog/categories",
      order: 3,
      icon: "mdi-file-document-edit-outline",
      hidden: "false"
    },
    {
      text: locales.navigation.blog_tags,
      slug: "admin-blog-tags",
      path: "/admin/blog/tags",
      order: 4,
      icon: "mdi-file-document-edit-outline",
      hidden: "false"
    },
    {
      text: locales.navigation.media,
      slug: "admin-media",
      path: "/admin/media",
      order: 4,
      icon: "mdi-camera-burst",
      hidden: "false"
    },
    {
      text: locales.navigation.navigation,
      slug: "admin-navigation",
      path: "/admin/navigation",
      order: 5,
      icon: "mdi-format-list-bulleted",
      hidden: "false"
    },
    {
      text: `${locales.navigation.users} & ${locales.navigation.groups} `,
      path: "/admin/users",
      order: 6,
      slug: "admin-users-groups",
      icon: "mdi-account-box-outline",
      hidden: "false"
    },
    {
      text: locales.navigation.users,
      slug: "admin-users",
      path: "/admin/users",
      order: 1,
      icon: "mdi-account",
      hidden: "false"
    },
    {
      text: locales.navigation.groups,
      slug: "admin-roles",
      path: "/admin/roles",
      order: 2,
      icon: "mdi-account-group",
      hidden: "false"
    },
    {
      text: locales.navigation.permissions,
      slug: "admin-permissions",
      path: "/admin/permissions",
      order: 3,
      icon: "mdi-lock",
      hidden: "false"
    },
    {
      text: locales.navigation.forms,
      slug: "admin-forms",
      path: "/admin/forms",
      order: 7,
      icon: "mdi-card-bulleted-outline",
      hidden: "false"
    },
    {
      text: locales.navigation.theme,
      slug: "admin-theme",
      path: "/admin/theme",
      order: 8,
      icon: "mdi-palette-advanced",
      hidden: "false"
    },
    {
      text: locales.navigation.settings,
      slug: "admin-settings",
      path: "/admin/settings",
      order: 9,
      icon: "mdi-settings",
      hidden: "false"
    },
    {
      text: locales.navigation.home,
      slug: "home",
      path: "/",
      order: 10,
      icon: "mdi-home",
      hidden: "false"
    },
    {
      text: locales.navigation.blog,
      slug: "blog",
      path: "/blog",
      order: 11,
      icon: "mdi-home",
      hidden: "false"
    },
  ])

  const adminLocation = await NavLocation.findOne({ where: { name: "admin-menu" } })
  const mainLocation = await NavLocation.findOne({ where: { name: "main-menu" } })

  const homeMenu = await Navigation.findAll({ where: { path: { [Op.notLike]: "/admin%" } }, attributes: ["id"], raw: true } )
  mainLocation.addNavigations(homeMenu.map(h => h.id))

  const adminMenu = await Navigation.findAll({ where: { path: { [Op.like]: "/admin%" } }, attributes: ["id"], raw: true } )
  adminLocation.addNavigations(adminMenu.map(a => a.id))

  const userGroups = await Navigation.findOne({ where: { slug: "admin-users-groups" } })
  let childs = ["admin-users", "admin-roles", "admin-permissions"]
  childs.forEach(async child => {
    const _c = await Navigation.findOne({ where: { slug: child }, attributes: ["id"], raw: true })
    userGroups.addChilds([_c.id])
  })

  const pages = await Navigation.findOne({ where: { slug: "admin-pages" } })
  childs = ["admin-pages-all", "admin-pages-new"]
  childs.forEach(async child => {
    const _c = await Navigation.findOne({ where: { slug: child }, attributes: ["id"], raw: true })
    pages.addChilds([_c.id])
  })

  const blogs = await Navigation.findOne({ where: { slug: "admin-blog" } })
  childs = ["admin-blog-all", "admin-blog-new", "admin-blog-category", "admin-blog-tags"]
  childs.forEach(async child => {
    const _c = await Navigation.findOne({ where: { slug: child }, attributes: ["id"], raw: true })
    blogs.addChilds([_c.id])
  })
  return true
}
