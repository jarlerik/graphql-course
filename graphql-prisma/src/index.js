import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
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


const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            pubSub,
            prisma,
            request
        }
    }
})
server.start(() => console.log('Server is running on localhost:4000'))