import gql from "graphql-tag"

/*
 * USER MUTATIONS
 *  - create User
 *  - update User
 *  - destroy User
 *  - attach Role to User
 *  - detach Roles from User
 *  - attach Permission to User
 *  - detach Permissions from Users
 */
export const createUser = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $accountname: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      accountname: $accountname
    ) {
      id
      firstname
      lastname
      email
      accountname
    }
  }
`

export const updateUser = gql`
  mutation updateUser(
    $id: Int!
    $firstname: String
    $lastname: String
    $email: String
    $password: String
    $accountname: String
  ) {
    updateUser(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      accountname: $accountname
    ) {
      id
      firstname
      lastname
      email
      accountname
    }
  }
`

export const destroyUsers = gql`
  mutation destroyUsers($ids: [Int!]!) {
    destroyUsers(ids: $ids) {
      id
    }
  }
`

export const attachRoleToUser = gql`
  mutation attachRoleToUser(
    $id: Int!
    $attach: [Int]!
  ) {
    attachRoleToUser (
      id: $id
      attach: $attach
    ) {
      id
      name
      slug
      description
    }
  }
`

export const detachRolesFromUser = gql`
  mutation detachRolesFromUser(
    $id: Int!
    $detach: [Int]!
  ) {
    detachRolesFromUser (
      id: $id
      detach: $detach
    ) {
      id
      name
      slug
      description
    }
  }
`

export const attachPermissionToUser = gql`
  mutation attachPermissionToUser(
    $id: Int!
    $attach: [Int]!
  ) {
    attachPermissionToUser (
      id: $id
      attach: $attach
    ) {
      id
      name
      slug
      description
    }
  }
`

export const detachPermissionsFromUser = gql`
  mutation detachPermissionsFromUser(
    $id: Int!
    $detach: [Int]!
  ) {
    detachPermissionsFromUser (
      id: $id
      detach: $detach
    ) {
      id
      name
      slug
      description
    }
  }
`

/*
 * ROLE MUTATIONS
 *  - create Role
 *  - update Role
 *  - destroy Role
 *  - attach User to Role
 *  - detach Users from Role
 *  - attach Permission to Role
 *  - detach Permissions from Role
 */

export const createRole = gql`
  mutation createRole(
    $name: String!
    $slug: String!
    $description: String!
  ) {
    createRole(
      name: $name
      slug: $slug
      description: $description
    ) {
      id
      name
      slug
      description
    }
  }
`

export const updateRole = gql`
  mutation updateRole(
    $id: Int!
    $name: String!
    $slug: String!
    $description: String!
  ) {
    updateRole(
      id: $id
      name: $name
      slug: $slug
      description: $description
    ) {
      id
      name
      slug
      description
    }
  }
`

export const destroyRoles = gql`
  mutation destroyRoles($ids: [Int!]!) {
    destroyRoles(ids: $ids) {
      id
    }
  }
`
export const attachUserToRole = gql`
  mutation attachUserToRole(
    $id: Int!
    $attach: [Int]!
  ) {
    attachUserToRole (
      id: $id
      attach: $attach
    ) {
      id
      firstname
      lastname
      email
      accountname
    }
  }
`

export const detachUsersFromRole = gql`
  mutation detachUsersFromRole(
    $id: Int!
    $detach: [Int]!
  ) {
    detachUsersFromRole (
      id: $id
      detach: $detach
    ) {
      id
      firstname
      lastname
      email
      accountname
    }
  }
`

export const attachPermissionToRole = gql`
  mutation attachPermissionToRole(
    $id: Int!
    $attach: [Int]!
  ) {
    attachPermissionToRole (
      id: $id
      attach: $attach
    ) {
      id
      name
      slug
      description
    }
  }
`

export const detachPermissionsFromRole = gql`
  mutation detachPermissionsFromRole(
    $id: Int!
    $detach: [Int]!
  ) {
    detachPermissionsFromRole (
      id: $id
      detach: $detach
    ) {
      id
      name
      slug
      description
    }
  }
`

/*
 * Permission MUTATIONS
 *  - attach User to Permission
 *  - detach Users from Permission
 *  - attach Role to Permission
 *  - detach Roles from Permission
 */

export const attachUserToPermission = gql`
mutation attachUserToPermission(
  $id: Int!
  $attach: [Int]!
) {
  attachUserToPermission (
    id: $id
    attach: $attach
  ) {
    id
    firstname
    lastname
    email
    accountname
  }
}
`

export const detachUsersFromPermission = gql`
mutation detachUsersFromPermission(
  $id: Int!
  $detach: [Int]!
) {
  detachUsersFromPermission (
    id: $id
    detach: $detach
  ) {
    id
    firstname
    lastname
    email
    accountname
  }
}
`

export const attachRoleToPermission = gql`
mutation attachRoleToPermission(
  $id: Int!
  $attach: [Int]!
) {
  attachRoleToPermission (
    id: $id
    attach: $attach
  ) {
    id
    name
    slug
    description
  }
}
`

export const detachRolesFromPermission = gql`
mutation detachRolesFromPermission(
  $id: Int!
  $detach: [Int]!
) {
  detachRolesFromPermission (
    id: $id
    detach: $detach
  ) {
    id
    name
    slug
    description
  }
}
`

/*
 * Page MUTATIONS
 *  - create Page
 *  - update Page
 *  - destroy Page
 *  - attach User to Page
 *  - detach Users from Page
 *  - attach Permission to Page
 *  - detach Permissions from Page
 */

 export const createPage = gql`
  mutation createPage(
    $title: String!
    $slug: String!
    $path: String!
  ) {
    createPage (
      title: $title,
      slug: $slug,
      path: $path
    ) {
      id
      title
      slug
      path
      isStatic
      isPublished
      version
      uuid
    }
  }
 `

 export const updatePage = gql`
  mutation updatePage(
    $title: String!
    $slug: String!
    $path: String!
    $uuid: String!
    $layout: String
    $hidden: Boolean
    $isDraft: Boolean!
    $publishingDate: String!
    $createdAt: String!
  ) {
    updatePage (
      title: $title,
      slug: $slug,
      path: $path,
      uuid: $uuid,
      layout: $layout,
      hidden: $hidden
      isDraft: $isDraft,
      publishingDate: $publishingDate,
      created_at: $createdAt
    ) {
      id
      title
      slug
      path
      isStatic
      version
      uuid
    }
  }
 `

 /*
 * Component MUTATIONS
 *  - create Component
 *  - update Component
 *  - destroy Component
 */

 export const createComponent = gql`
 mutation createComponent(
   $name: String!
   $title: String!
   $properties: String!
   $content: String
   $order: Int
   $hidden: Boolean
   $pageId: Int
   $componentId: Int
 ) {
  createComponent (
    name: $name,
    title: $title,
    properties: $properties,
    content: $content,
    order: $order,
    hidden: $hidden,
    pageId: $pageId,
    componentId: $componentId
  ) {
    id
  }
 }
 `
/*
 * Navigation MUTATIONS
 *  - create Navigation
 *  - update Navigation
 *  - destroy Navigation
 */
export const createNavigation = gql`
  mutation createNavigation(
    $text: String!
    $slug: String!
    $path: String!
    $icon: String!
    $hidden: Boolean
    $navlocationId: Int!
  ) {
    createNavigation(
      text: $text
      slug: $slug
      path: $path
      icon: $icon
      hidden: $hidden
      navlocationId: $navlocationId
    ) {
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
`
export const updateNavigation = gql`
  mutation updateNavigation(
    $id: Int!
    $text: String!
    $slug: String!
    $path: String!
    $icon: String!
    $hidden: Boolean
  ) {
    updateNavigation(
      id: $id
      text: $text
      slug: $slug
      path: $path
      icon: $icon
      hidden: $hidden
    ) {
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
`

export const destroyNavigations = gql`
  mutation destroyNavigations($ids: [Int!]!) {
    destroyNavigations(ids: $ids) {
      id
    }
  }
`

/*
 * NavigationLocation MUTATIONS
 *  - create NavigationLocation
 *  - update NavigationLocation
 *  - destroy NavigationLocations
 */
export const createNavigationLocation = gql`
  mutation createNavigationLocation(
    $name: String!
    $hidden: Boolean
  ) {
    createNavigationLocation(
      name: $name
      hidden: $hidden
    ) {
      id
      name
      hidden
      createdAt
      updatedAt
    }
  }
`
export const updateNavigationLocation = gql`
  mutation updateNavigationLocation(
    $id: Int!
    $name: String!
    $hidden: Boolean
  ) {
    updateNavigationLocation(
      id: $id
      name: $name
      hidden: $hidden
    ) {
      id
      name
      hidden
      createdAt
      updatedAt
    }
  }
`

export const destroyNavigationLocations = gql`
  mutation destroyNavigationLocations($ids: [Int!]!) {
    destroyNavigationLocations(ids: $ids) {
      id
    }
  }
`

/*
 * Form MUTATIONS
 *  - create Form
 *  - update Form
 *  - destroy Form
 */
export const createForm = gql`
  mutation createForm(
    $name: String!
  ) {
    createForm(
      name: $name
    ) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const updateForm = gql`
  mutation updateForm(
    $id: Int!
    $name: String!
  ) {
    updateForm(
      id: $id
      name: $name
    ) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const destroyForms = gql`
  mutation destroyForms($ids: [Int!]!) {
    destroyForms(ids: $ids) {
      id
    }
  }
`

/*
 * FormField MUTATIONS
 *  - create FormField
 *  - update FormField
 *  - destroy FormFields
 */
export const createFormField = gql`
  mutation createFormField(
    $label: String!
    $inputType: String!
    $hint: String
    $required: Boolean
    $formId: Int!
  ) {
    createFormField(
      label: $label
      inputType: $inputType
      hint: $hint
      required: $required
      formId: $formId
    ) {
      id
      label
      inputType
      hint
      required
      createdAt
      updatedAt
    }
  }
`
export const updateFormField = gql`
  mutation updateFormField(
    $id: Int!
    $label: String!
    $inputType: String!
    $hint: String
    $required: Boolean
  ) {
    updateFormField(
      id: $id
      label: $label
      inputType: $inputType
      hint: $hint
      required: $required
    ) {
      id
      label
      inputType
      hint
      required
      createdAt
      updatedAt
    }
  }
`

export const destroyFormFields = gql`
  mutation destroyFormFields($ids: [Int!]!) {
    destroyFormFields(ids: $ids) {
      id
    }
  }
`

/*
 * FormData MUTATIONS
 *  - create FormData
 *  - update FormData
 *  - destroy FormData
 */
export const createFormData = gql`
  mutation createFormData(
    $data: String!
    $formId: Int!
  ) {
    createFormData(
      data: $data
      formId: $formId
    ) {
      id
      data
      createdAt
      updatedAt
    }
  }
`
export const updateFormData = gql`
  mutation updateFormData(
    $id: Int!
    $data: String
    $seen: Boolean
  ) {
    updateFormField(
      id: $id
      data: $data
      seen: $seen
    ) {
      id
      data
      seen
      createdAt
      updatedAt
    }
  }
`

export const destroyFormDatas = gql`
  mutation destroyFormDatas($ids: [Int!]!) {
    destroyFormFields(ids: $ids) {
      id
    }
  }
`
