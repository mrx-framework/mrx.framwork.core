import gql from "graphql-tag"

/*
 * BlogCategory MUTATIONS
 *  - create BlogCategory
 *  - update BlogCategory
 *  - destroy BlogCategory
 */

export const createBlogCategory = gql`
  mutation createBlogCategory (
    $name: String!
  ) {
    createBlogCategory (
      name: $name
    ) {
      id
      name
      createdAt
      updatedAt
    }
  }
 `

export const updateBlogCategory = gql`
  mutation updateBlogCategory (
    $id: Int!,
    $name: String!,
  ) {
    updateBlogCategory (
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

export const destroyBlogCategories = gql `
  mutation destroyBlogCategories ($ids: [Int!]!) {
    destroyBlogCategories (ids: $ids) {
      id
    }
  }
`
