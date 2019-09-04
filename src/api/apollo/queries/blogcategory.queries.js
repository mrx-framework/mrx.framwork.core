import gql from "graphql-tag"
/*
 * BlogCategory QUERY
 *  - get BlogCategory
 *  - get BlogCategoryList
 */

export const getBlogCategory = gql`
  query getBlogPost(
      $id: Int!,
      $page: Int,
      $limit: Int,
      $query: String
  ) {
    blogcategory (id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const getBlogCategories = gql`
  query getBlogCategories(
    $page: Int,
    $limit: Int,
    $query: String
  ) {
    blogcategories(page: $page, limit: $limit, query: $query) {
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

