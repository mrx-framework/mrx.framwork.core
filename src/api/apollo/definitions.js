import * as queries from "./queries"
import * as mutations from "./mutations"
// Todo: All queries into queries folder and index them with automatic load
import { getBlogPost, getBlogPosts } from "./queries/blog.queries"
import { createBlogPost, updateBlogPost, destroyBlogPosts } from "./mutations/blog.mutations"

import { getBlogCategory, getBlogCategories } from "./queries/blogcategory.queries"
import { createBlogCategory, updateBlogCategory, destroyBlogCategories } from "./mutations/blogcategory.mutations"

import { getTag, getTags } from "./queries/tag.queries"
import { createTag, updateTag, destroyTags } from "./mutations/tag.mutations"

const definitions = {
  users: {
    name: {
      singular: "user",
      plural: "users"
    },
    title: {
      singular: "Benutzer",
      plural: "Benutzer"
    },
    description: "manage_users",
    headers: [
      { text: "Vorname", align: "left", sortable: false, value: "firstname" },
      { text: "Nachname", value: "lastname" },
      { text: "E-Mail", value: "email" },
      { text: "Accountname", value: "accountname" }
    ],
    schema: {
      firstname: { type: "text", label: "Vorname", value: "" },
      lastname: { type: "text", label: "Nachname", value: "" },
      email: { type: "text", label: "E-Mail", value: "" },
      accountname: { type: "text", label: "Accountname", value: "" },
      password: { type: "text", label: "Passwort", value: "" }
    },
    childs: [],
    handlers: {
      getList: queries.getUsers,
      getItem: null,
      createItem: mutations.createUser,
      updateItem: mutations.updateUser,
      destroyItem: mutations.destroyUsers
    },
    attach: {
      roles: mutations.attachRoleToUser,
      permissions: mutations.attachPermissionToUser,
    },
    detach: {
      roles: mutations.detachRolesFromUser,
      permissions: mutations.detachPermissionsFromUser,
    },
    itemText: (props) => `${props.firstname} ${props.lastname}`,
  },
  roles: {
    name: {
      singular: "role",
      plural: "roles"
    },
    title: {
      singular: "Gruppe",
      plural: "Gruppen"
    },
    description: "manage_groups",
    headers: [
      { text: "Name", align: "left", sortable: false, value: "name" },
      { text: "Slug", value: "slug" },
      { text: "Beschreibung", value: "description" },
    ],
    schema: {
      name: { type: "text", label: "Name", value: "" },
      slug: { type: "text", label: "Slug", value: "" },
      description: { type: "text", label: "Beschreibung", value: "" },
    },
    childs: [
      { name: "Benutzer", icon: "mdi-account", modelName: "users" },
      { name: "Berechtigungen", icon: "mdi-lock", modelName: "permissions" },
    ],
    handlers: {
      getList: queries.getRoles,
      getItem: queries.getRole,
      createItem: mutations.createRole,
      updateItem: mutations.updateRole,
      destroyItem: mutations.destroyRoles
    },
    attach: {
      users: mutations.attachUserToRole,
      permissions: mutations.attachPermissionToRole
    },
    detach: {
      users: mutations.detachUsersFromRole,
      permissions: mutations.detachPermissionsFromRole
    },
    itemText: (props) => `${props.name}`
  },
  permissions: {
    name: {
      singular: "permission",
      plural: "permissions"
    },
    title: {
      singular: "Berechtigung",
      plural: "Berechtigungen"
    },
    description: "manage_permissions",
    headers: [
      { text: "Name", align: "left", sortable: false, value: "name" },
      { text: "Slug", value: "slug" },
      { text: "Beschreibung", value: "description" },
    ],
    schema: {
      name: { type: "text", label: "Name", value: "" },
      slug: { type: "text", label: "Slug", value: "" },
      description: { type: "text", label: "Beschreibung", value: "" },
    },
    childs: [
      { name: "Gruppen", icon: "mdi-account-group", modelName: "roles" },
      { name: "Benutzer", icon: "mdi-account", modelName: "users" },
    ],
    handlers: {
      getList: queries.getPermissions,
      getItem: queries.getPermission,
      createItem: null,
      updateItem: null,
      destroyItem: null
    },
    attach: {
      users: mutations.attachUserToPermission,
      roles: mutations.attachRoleToPermission
    },
    detach: {
      users: mutations.detachUsersFromPermission,
      roles: mutations.detachRolesFromPermission
    },
    itemText: (props) => `${props.name}`
  },
  pages: {
    name: {
      singular: "page",
      plural: "pages"
    },
    title: {
      singular: "Seite",
      plural: "Seiten"
    },
    description: "manage_pages",
    headers: [
      { text: "Title", align: "left", sortable: false, value: "title" },
      { text: "Slug", value: "slug" },
      { text: "Pfad", value: "path" },
      { text: "published", value: "isPublished", type: "Boolean" },
      { text: "version", value: "version" },
    ],
    schema: {
      title: { type: "text", label: "Title", value: "" },
      slug: { type: "text", label: "Slug", value: "" },
      path: { type: "text", label: "Pfad", value: "" }
    },
    childs: [

    ],
    handlers: {
      getList: queries.getPages,
      getItem: queries.getPage,
      createItem: mutations.createPage,
      updateItem: mutations.updatePage,
      destroyItem: null
    },
    attach: {

    },
    detach: {

    },
    itemText: (props) => `${props.title}`
  },
  navlocations: {
    name: {
      singular: "navlocation",
      plural: "navlocations"
    },
    title: {
      singular: "Navigation",
      plural: "Navigationen"
    },
    description: "manage_navlocations",
    headers: [
      { text: "Name", align: "left", sortable: false, value: "name" },
    ],
    schema: {
      name: { type: "text", label: "Name", value: "" }
    },
    childs: [
      {
        name: "Menüpunkte",
        icon: "mdi-format-list-bulleted",
        modelName: "navigations",
        associationType: "hasMany"
      },
    ],
    handlers: {
      getList: queries.getNavigationLocations,
      getItem: queries.getNavigationLocation,
      createItem: mutations.createNavigationLocation,
      updateItem: mutations.updateNavigationLocation,
      destroyItem: mutations.destroyNavigationLocations,
    },
    attach: {
      navigation: null,//mutations.attachNavigationToNavigationLocation,
    },
    detach: {
      navigation: null,//mutations.detachNavigationToNavigationLocation
    },
  },
  navigations: {
    name: {
      singular: "navigation",
      plural: "navigations"
    },
    title: {
      singular: "Menüpunkt",
      plural: "Menüpunkte"
    },
    description: "manage_navigations",
    headers: [
      { text: "Name", align: "left", sortable: false, value: "text" },
      { text: "Slug", value: "slug" },
      { text: "Pfad", value: "path" },
      { text: "Icon", value: "icon" },
      { text: "Versteckt", value: "hidden", type: "Boolean" },
    ],
    schema: {
      text: { type: "text", label: "Name", value: "" },
      slug: { type: "text", label: "Slug", value: "" },
      path: { type: "text", label: "Pfad", value: "" },
      icon: { type: "text", label: "Icon", value: "" },
      hidden: { type: "hidden", label: "Versteckt", value: false }
    },
    childs: [
      {
        name: "Menülocation",
        icon: "mdi-format-list-bulleted",
        modelName: "navlocation",
        associationType: "belongsTo"
      },
    ],
    handlers: {
      getList: queries.getNavigations,
      getItem: queries.getNavigation,
      createItem: mutations.createNavigation,
      updateItem: mutations.updateNavigation,
      destroyItem: mutations.destroyNavigations,
    },
    attach: {
      navigation: null,//mutations.attachNavigationToNavigationLocation,
    },
    detach: {
      navigation: null,//mutations.detachNavigationToNavigationLocation
    },
  },
  forms: {
    name: {
      singular: "form",
      plural: "forms"
    },
    title: {
      singular: "Formular",
      plural: "Formulare"
    },
    description: "manage_forms",
    headers: [
      { text: "Name", align: "left", sortable: false, value: "name" },
    ],
    schema: {
      name: { type: "text", label: "Name", value: "" }
    },
    childs: [
      {
        name: "Einträge",
        icon: "mdi-format-list-bulleted",
        modelName: "formdatas",
        associationType: "hasMany"
      },
      {
        name: "Form Felder",
        icon: "mdi-format-list-bulleted",
        modelName: "formfields",
        associationType: "hasMany"
      },
    ],
    handlers: {
      getList: queries.getForms,
      getItem: queries.getForm,
      createItem: mutations.createForm,
      updateItem: mutations.updateForm,
      destroyItem: mutations.destroyForms,
    },
    attach: {
      navigation: null,//mutations.attachNavigationToNavigationLocation,
    },
    detach: {
      navigation: null,//mutations.detachNavigationToNavigationLocation
    },
    itemText: (props) => props.name
  },
  formfields: {
    name: {
      singular: "formfield",
      plural: "formfields"
    },
    title: {
      singular: "Form Feld",
      plural: "Form Felder"
    },
    description: "manage_form_fields",
    headers: [
      { text: "Label", align: "left", sortable: false, value: "label" },
      { text: "Typ", value: "inputType" },
      { text: "Beschreibung", value: "hint" },
      { text: "Pflichtfeld", value: "required", type: "Boolean" },
    ],
    schema: {
      label: { type: "text", label: "Label", value: "" },
      inputType: { type: "text", label: "Typ", value: "" },
      hint: { type: "text", label: "Beschreibung", value: "" },
    },
    childs: [
      {
        name: "Form",
        icon: "mdi-format-list-bulleted",
        modelName: "forms",
        associationType: "belongsTo"
      },
    ],
    handlers: {
      getList: queries.getFormFields,
      getItem: queries.getFormField,
      createItem: mutations.createFormField,
      updateItem: mutations.updateFormField,
      destroyItem: mutations.destroyFormFields,
    },
    attach: {
      navigation: null,//mutations.attachNavigationToNavigationLocation,
    },
    detach: {
      navigation: null,//mutations.detachNavigationToNavigationLocation
    },
  },
  formdatas: {
    name: {
      singular: "formdata", // DO NOT CHANGE THIS => Cause we use exception in CRUD TABLE HEADERS HERE
      plural: "formdatas"
    },
    title: {
      singular: "Form Data",
      plural: "Form Datas"
    },
    description: "manage_form_datas",
    headers: [
      { text: "Data", align: "left", sortable: false, value: "data" },
      { text: "Seen", value: "seen", type: "Boolean" },
    ],
    schema: {
      data: { type: "text", label: "Data", value: "" },
      seen: { type: "text", label: "Seen", value: "" }
    },
    childs: [
      {
        name: "Form",
        icon: "mdi-format-list-bulleted",
        modelName: "forms",
        associationType: "belongsTo"
      },
    ],
    handlers: {
      getList: queries.getFormDatas,
      getItem: queries.getFormData,
      createItem: mutations.createFormData,
      updateItem: mutations.updateFormData,
      destroyItem: mutations.destroyFormDatas,
    },
    attach: {
      navigation: null,//mutations.attachNavigationToNavigationLocation,
    },
    detach: {
      navigation: null,//mutations.detachNavigationToNavigationLocation
    },
  },
  blogpost: {
    name: {
      singular: "blogpost",
      plural: "blogposts"
    },
    title: {
      singular: "Blog Post",
      plural: "Blog Posts"
    },
    description: "manage_blogs",
    headers: [
      { text: "title", align: "left", sortable: false, value: "title" },
      { text: "path", value: "path" },
      { text: "published", value: "isPublished", type: "Boolean" },
      { text: "version", value: "version" },
    ],
    schema: {
      title: { type: "text", label: "title", value: "" },
      path: { type: "text", label: "path", value: "" }
    },
    childs: [

    ],
    handlers: {
      getList: getBlogPosts,
      getItem: getBlogPost,
      createItem: createBlogPost,
      updateItem: updateBlogPost,
      destroyItem: destroyBlogPosts
    },
    attach: {

    },
    detach: {

    },
    itemText: (props) => `${props.title}`
  },
  blogcategories: {
    name: {
      singular: "blogcategory",
      plural: "blogcategories"
    },
    title: {
      singular: "Blog Category",
      plural: "Blog Category"
    },
    description: "manage_blog_categories",
    headers: [
      { text: "name", align: "left", sortable: false, value: "name" }
    ],
    schema: {
      name: { type: "text", label: "name", value: "" }
    },
    childs: [

    ],
    handlers: {
      getList: getBlogCategories,
      getItem: getBlogCategory,
      createItem: createBlogCategory,
      updateItem: updateBlogCategory,
      destroyItem: destroyBlogCategories
    },
    attach: {

    },
    detach: {

    },
    itemText: (props) => `${props.name}`
  },
  tags: {
    name: {
      singular: "tag",
      plural: "tags"
    },
    title: {
      singular: "Tag",
      plural: "tags"
    },
    description: "manage_tags",
    headers: [
      { text: "name", align: "left", sortable: false, value: "name" }
    ],
    schema: {
      name: { type: "text", label: "name", value: "" }
    },
    childs: [

    ],
    handlers: {
      getList: getTags,
      getItem: getTag,
      createItem: createTag,
      updateItem: updateTag,
      destroyItem: destroyTags
    },
    attach: {

    },
    detach: {

    },
    itemText: (props) => `${props.name}`
  }
}

export const getDefinitionForQuery = (query) => {
  return definitions[query]
}

export const getHeadersForQuery = (query) => {
  return definitions[query].headers
}

export const getSchemaForQuery = (query) => {
  return definitions[query].schema
}

export const getQueries = (query) => {
  return {
    list: definitions[query].getList,
    item: definitions[query].getItem,
  }
}
