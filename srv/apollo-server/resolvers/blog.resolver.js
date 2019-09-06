const { QueryModel } = require("../utils")
const moment = require("moment")

module.exports = {
  BlogPost: {
    category: async (parent) => await parent.getBlogcategory(),
    author: async (parent) => await parent.getAuthor(),
    editor: async (parent) => await parent.getEditor(),
    /*
    tags: (parent, args) => {
      const { page, limit, query } = args
      QueryRelated(
        parent,
        "getTags",
        page,
        limit,
        query,
        ["name"]
      )
    }
    */
  },
  Query: {
    displayblogpost: async (_, { path }, { BlogPost, Tag }) => {
      let _order = [["version", "DESC"]]

      return await BlogPost.findOne({
        where: { path },
        order: _order,
        include: [Tag]
      })
    },
    blogpost: async (_, { id }, { BlogPost, BlogCategory, Tag }) => await BlogPost.findByPk(id, { include: [BlogCategory, Tag] }),
    blogposts: (_, { page, limit, query }, { BlogPost }) => QueryModel(
      BlogPost,
      page,
      limit,
      query,
      ["title", "path"],
      null,
      true
    ),

    blogcategory: async (_, { id }, { BlogCategory }) => await BlogCategory.findByPk(id),
    blogcategories: (_, { page, limit, query }, { BlogCategory }) => QueryModel(
      BlogCategory,
      page,
      limit,
      query,
      ["name"]
    ),

    tag: async (_, { id }, { Tag }) => await Tag.findByPk(id),
    tags: (_, { page, limit, query }, { Tag }) => QueryModel(
      Tag,
      page,
      limit,
      query,
      ["name"]
    ),
  },
  Mutation: {
    createBlogPost: async (_, args, { BlogPost, User, currentUser } ) => {
      const { accountname } = currentUser
      const author = await User.findOne({ where: { accountname } })
      const post = await BlogPost.create(args)
      await post.setAuthor(author.id)
      await post.setEditor(author.id)
      return post
    },
    updateBlogPost: async (_, args , { BlogPost, User, currentUser }) => {
      const { accountname } = currentUser
      const author = await User.findOne({ where: { accountname } })

      const blogPayload = {
        title: args.title,
        path: args.path,
        content: args.content,
        uuid: args.uuid,
        createdAt: moment().utc(args.createdAt / 1000).format("YYYY-MM-DD HH:mm:ss"),
        isDraft: args.isDraft
      }

      const blog = await BlogPost.create(blogPayload, { raw: true })
      if (args.category) {
        blog.setBlogcategory(args.category)
      }
      if (args.tags) {
        blog.setTags(args.tags)
      }
      blog.setEditor(author.id)

      return blog
    },
    destroyBlogPosts: async(_, { ids }, { BlogPost }) => {
      try {
        const blogPostToDestroy = await BlogPost.findAll({ where: { id: ids } })
        await BlogPost.destroy({ where: { id: ids } })
        return blogPostToDestroy
      } catch (e) {
        return []
      }
    },

    createBlogCategory: async (_, args, { BlogCategory } ) => {
      return await BlogCategory.create(args)
    },
    updateBlogCategory: async(_, args , { BlogCategory }) => {
      await BlogCategory.update(args, { where: { id: args.id } })
      return await BlogCategory.findByPk(args.id)
    },
    destroyBlogCategories: async(_, { ids }, { BlogCategory }) => {
      try {
        const blogCategoriesToDestroy = await BlogCategory.findAll({ where: { id: ids } })
        await BlogCategory.destroy({ where: { id: ids } })
        return blogCategoriesToDestroy
      } catch (e) {
        return []
      }
    },

    createTag: async (_, args, { Tag } ) => {
      return await Tag.create(args)
    },
    updateTag: async(_, args , { Tag }) => {
      await Tag.update(args, { where: { id: args.id } })
      return await Tag.findByPk(args.id)
    },
    destroyTags: async(_, { ids }, { Tag }) => {
      try {
        const tagsToDestroy = await Tag.findAll({ where: { id: ids } })
        await Tag.destroy({ where: { id: ids } })
        return tagsToDestroy
      } catch (e) {
        return []
      }
    },
  }
}
