import gql from "graphql-tag"

/*
 * BlogPost MUTATIONS
 *  - create BlogPost
 *  - update BlogPost
 *  - destroy BlogPost
 */

export const createBlogPost = gql`
  mutation createBlogPost (
    $title: String!,
    $path: String!,
    $content: String
  ) {
    createBlogPost (
      title: $title
      path: $path
      content: $content
    ) {
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
 `

export const updateBlogPost = gql`
  mutation updateBlogPost (
    $id: Int!,
    $title: String!,
    $path: String!,
    $content: String,
    $category: Int,
    $tags: [Int],
    $createdAt: String!,
    $uuid: String!,
    $isDraft: Boolean
  ) {
    updateBlogPost (
      id: $id
      title: $title
      path: $path
      content: $content
      category: $category
      tags: $tags
      createdAt: $createdAt,
      uuid: $uuid,
      isDraft: $isDraft
    ) {
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
`

export const destroyBlogPosts = gql `
  mutation destroyBlogPosts ($ids: [Int!]!) {
    destroyBlogPosts (ids: $ids) {
      id
    }
  }
`
