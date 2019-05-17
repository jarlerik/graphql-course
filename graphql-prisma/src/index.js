import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'

/**
Scalar Types
    String
    Boolean
    Int
    Float
    ID

Query params to resolver function
    parent, args, ctx, info
 */

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  fragmentReplacements,
  context(request) {
    return {
      pubSub,
      prisma,
      request,
    }
  },
})
// eslint-disable-next-line no-console
server.start(() => console.log('Server is running on localhost:4000'))
