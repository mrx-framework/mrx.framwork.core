const config = require("../../../config")
const locales = require(`../../../src/locales/${config.locale}`)

module.exports = async ({ Page }) => {
  const pages = await Page.bulkCreate([
    {
      title: locales.navigation.dashboard,
      slug: "admin-dashboard",
      path: "/admin",
      component: "/admin/Dashboard.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.pages,
      slug: "admin-pages",
      path: "/admin/pages",
      component: "/admin/pages/index.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.new_page,
      slug: "admin-pages-new",
      path: "/admin/pages/action",
      layout: "blank",
      component: "/admin/pages/action.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.blog,
      slug: "admin-blog",
      path: "/admin/blog",
      component: "/admin/blog/index.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.blog,
      slug: "admin-blog-newedit",
      path: "/admin/blog/action",
      component: "/admin/blog/action.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.blog_categories,
      slug: "admin-blog-category",
      path: "/admin/blog/categories",
      component: "/admin/blog/categories.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.blog_tags,
      slug: "admin-blog-tag",
      path: "/admin/blog/tags",
      component: "/admin/blog/tags.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.media,
      slug: "admin-media",
      path: "/admin/media",
      component: "/admin/media/index.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.navigation,
      slug: "admin-navigation",
      path: "/admin/navigation",
      component: "/admin/Navigation.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.users,
      slug: "admin-user",
      path: "/admin/users",
      component: "/admin/Users.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.groups,
      slug: "admin-roles",
      path: "/admin/roles",
      component: "/admin/Roles.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.permissions,
      slug: "admin-permissions",
      path: "/admin/permissions",
      component: "/admin/Permissions.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.forms,
      slug: "admin-forms",
      path: "/admin/forms",
      component: "/admin/Form.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.theme,
      slug: "admin-theme",
      path: "/admin/theme",
      component: "/admin/Theme.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.settings,
      slug: "admin-settings",
      path: "/admin/settings",
      component: "/admin/Settings.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.home,
      slug: "home",
      path: "/",
      isDraft: false,
      hidden: false,
      authorId: 1,
      editorId: 1
    },
    {
      title: locales.navigation.blog,
      slug: "blog",
      path: "/blog",
      component: "/frontend/Blog/BlogList.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
    {
      title: `${locales.navigation.blog} Single`,
      slug: "blog-single",
      path: "/blog/:path",
      component: "/frontend/Blog/BlogPost.vue",
      isDraft: false,
      hidden: true,
      authorId: 1,
      editorId: 1
    },
  ], { individualHooks: true, raw: true })

  return pages
}
