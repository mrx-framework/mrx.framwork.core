const path = require("path")
const { ApolloServer } = require("apollo-server-express")
const { fileLoader, mergeTypes, mergeResolvers } = require("merge-graphql-schemas")
const { models } = require("../database")

const createApolloServer = (app) => {
  const apollo = new ApolloServer({
    typeDefs: mergeTypes(fileLoader(path.join(__dirname, "schemas"))),
    resolvers: mergeResolvers(fileLoader(path.join(__dirname, "resolvers"))),
    context: ({ req }) => {
      return {
        ...models,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user
      }
    }
  })

  apollo.applyMiddleware({
    app,
    cors: false,
		bodyParserConfig: true
  })

}

module.exports = createApolloServer
