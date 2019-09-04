import gql from "graphql-tag"

/*
 * Tag MUTATIONS
 *  - create Tag
 *  - update Tag
 *  - destroy Tags
 */

export const createTag = gql`
  mutation createTag (
    $name: String!
  ) {
    createTag (
      name: $name
    ) {
      id
      name
      createdAt
      updatedAt
    }
  }
 `

export const updateTag = gql`
  mutation updateTag (
    $id: Int!,
    $name: String!,
  ) {
    updateTag (
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

export const destroyTags = gql `
  mutation destroyTags ($ids: [Int!]!) {
    destroyTags (ids: $ids) {
      id
    }
  }
`
