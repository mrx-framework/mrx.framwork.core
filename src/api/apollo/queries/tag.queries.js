import gql from "graphql-tag"
/*
 * Tag QUERY
 *  - get Tag
 *  - get TagList
 */

export const getTag = gql`
  query getTag(
      $id: Int!,
      $page: Int,
      $limit: Int,
      $query: String
  ) {
    tag (id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const getTags = gql`
  query getTags(
    $page: Int,
    $limit: Int,
    $query: String
  ) {
    tags(page: $page, limit: $limit, query: $query) {
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
  }
`

