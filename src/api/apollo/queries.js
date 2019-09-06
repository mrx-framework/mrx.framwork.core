
import gql from "graphql-tag"


export const getCurrentUser = gql`query getCurrentUser {
  currentUser {
    id
    firstname
    lastname
    accountname
    email
  }
}
`

export const getUsers = gql`query getUsers($page: Int, $limit: Int, $query: String) {
  users(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      firstname
      lastname
      accountname
      email
    }
  }
}`

export const getUser = gql`query getUser(
  $id: Int!,
  $page: Int,
  $limit: Int,
  $query: String
  ) {
  user( id: $id ) {
    id
    firstname
    lastname
    accountname
    email
    roles (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        name
        slug
        description
      }
    }
    permissions (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        name
        slug
        description
      }
    }
  }
}`

export const getRoles = gql`query getRoles($page: Int, $limit: Int, $query: String) {
  roles(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      name
      slug
      description
    }
  }
}`

export const getRole = gql`query getRole(
  $id: Int!,
  $page: Int,
  $limit: Int,
  $query: String
  ) {
  role(id: $id) {
    id
    name
    slug
    description
    users (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        firstname
        lastname
        email
        accountname
      }
    }
    permissions (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        name
        slug
        description
      }
    }
  }
}`

export const getPermissions = gql`query getPermissions($page: Int, $limit: Int, $query: String) {
  permissions(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      name
      slug
      description
    }
  }
}`

export const getPermission = gql`query getPermission(
  $id: Int!,
  $page: Int,
  $limit: Int,
  $query: String
  ) {
  permission(id: $id) {
    id
    name
    slug
    description
    users (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        firstname
        lastname
        email
        accountname
      }
    }
    roles (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        name
        slug
        description
      }
    }
  }
}`

export const getRoutes = gql`query getRoutes{
  routes {
    id
    title
    path
    component
    isStatic
  }
}`

export const displayNavigation = gql`query displayNavigation($location: String!, $parent: Int) {
  displayNavigation(location: $location, parent: $parent) {
    id
    text
    path
    icon
    childs {
      id
      text
      path
      icon
    }
  }
}`

export const getNavigationLocations = gql`query getNavigationLocations($page: Int, $limit: Int, $query: String) {
  navlocations(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      name
      createdAt
      updatedAt
    }
  }
}`

export const getNavigationLocation = gql`query getNavigationLocation(
  $id: Int!,
  $page: Int,
  $limit: Int,
  $query: String
  ) {
  navlocation(id: $id) {
    id
    name
    createdAt
    updatedAt
    navigations (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        text
        slug
        path
        icon
        hidden
        createdAt
        updatedAt
      }
    }
  }
}`

export const getNavigations = gql`query getNavigations($page: Int, $limit: Int, $query: String) {
  navigations(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      text
      slug
      path
      icon
      hidden
      createdAt
      updatedAt
    }
  }
}`

export const getNavigation = gql`query getNavigation($id: Int!) {
  navigation(id: $id) {
    id
    text
    slug
    path
    icon
    hidden
    createdAt
    updatedAt
  }
}`

export const displayForm = gql`query displayForm($id: Int!) {
  displayForm(id: $id) {
    id
    name
    formfields {
      id
      label
      inputType
      hint
      required
    },
    formdatas {
      id
      data
      seen
      createdAt
      updatedAt
    }
  }
}`


export const getForms = gql`query getForms($page: Int, $limit: Int, $query: String) {
  forms(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      name
      createdAt
      updatedAt
    }
  }
}`

export const getForm = gql`query getForm(
  $id: Int!,
  $page: Int,
  $limit: Int,
  $query: String
  ) {
  form(id: $id) {
    id
    name
    formfields (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        label
        inputType
        hint
        required
        createdAt
        updatedAt
      }
    }
    formdatas (page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        data
        seen
        createdAt
        updatedAt
      }
    }
    createdAt
    updatedAt
  }
}`

export const getFormFields = gql`query getForms($page: Int, $limit: Int, $query: String) {
  formFields(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      label
      inputType
      hint
      required
      createdAt
      updatedAt
    }
  }
}`

export const getFormField = gql`query getForm(
  $id: Int!
  ) {
  formField(id: $id) {
    id
    label
    inputType
    hint
    required
    createdAt
    updatedAt
  }
}`


export const getFormData = gql`query getFormData($id: Int!) {
  formData (id: $id) {
    id
    data
    seen
    createdAt
    updatedAt
  }
}`

export const getFormDatas = gql`query getFormDatas($page: Int, $limit: Int, $query: String){
  formDatas (page: $page, limit: $limit, query: $query) {
    id
    data
    seen
    createdAt
    updatedAt
  }
}`


export const getPages = gql`query getPages($page: Int, $limit: Int, $query: String) {
  pages(page: $page, limit: $limit, query: $query) {
    page
    limit
    total
    data {
      id
      title
      slug
      path
      isPublished
      isStatic
      version
      author {
        id
        firstname
        lastname
      }
      editor {
        id
        firstname
        lastname
      }
      uuid
    }
  }
}`

export const getPage = gql`query getPage($id: Int!) {
  page(id: $id) {
    id
    title
    slug
    path
    isPublished
    isStatic
    version
    author {
      id
      firstname
      lastname
    }
    editor {
      id
      firstname
      lastname
    }
    uuid
  }
}`

export const displayPage = gql`
query displayPage($id: Int, $path: String) {
  displayPage(id: $id, path: $path) {
    id
    title
    slug
    path
    version
    uuid
    publishingDate
    createdAt
    author {
      id
      firstname
      lastname
    }
    editor {
      id
      firstname
      lastname
    }
    components {
      ...ComponentRecursive
    }
  }
}
fragment ComponentRecursive on Component {
  ...ComponentFields
  childs {
    ...ComponentFields
    childs {
      ...ComponentFields
      childs {
        ...ComponentFields
        childs {
          ...ComponentFields
          childs {
            ...ComponentFields
            childs {
              ...ComponentFields
              childs {
                ...ComponentFields
                childs {
                  ...ComponentFields
                  childs {
                    ...ComponentFields
                    childs {
                      ...ComponentFields
                      childs {
                        ...ComponentFields
                        childs {
                          ...ComponentFields
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
fragment ComponentFields on Component {
  id
  name
  title
  properties
  content
  order
  hidden
}`
