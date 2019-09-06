import gql from "graphql-tag"
/*
 * Blog QUERY
 *  - display BlogPost
 *  - get BlogPost
 *  - get BlogPostList
 */

export const displayBlogPost = gql`
  query displayBlogPost (
    $path: String!
  ) {
    displayblogpost (path: $path) {
      id
      title
      path
      content
      version
      isPublished
      uuid
      category {
        id
        name
      }
      tags {
        id
        name
      }
      author {
        id
        firstname
        lastname
      }
      createdAt
      updatedAt
    }
  }
`

export const getBlogPost = gql`
  query getBlogPost(
      $id: Int!
  ) {
    blogpost (id: $id) {
      id
      title
      path
      content
      version
      isPublished
      uuid
      category {
        id
        name
      }
      tags {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const getBlogPosts = gql`
  query getBlogPosts(
    $page: Int,
    $limit: Int,
    $query: String
  ) {
    blogposts(page: $page, limit: $limit, query: $query) {
      page
      limit
      total
      data {
        id
        title
        path
        content
        version
        isPublished
        uuid
        createdAt
        updatedAt
      }
    }
  }
`

