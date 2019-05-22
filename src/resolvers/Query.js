import getUserFromToken from '../auth/getUserFromToken'

const Query = {
  users(parent, args, { prisma }, info) {
    const { query } = args
    const opArgs = {}

    if (query) {
      opArgs.where = {
        OR: [
          { name_contains: query },
          { email_contains: query },
        ],
      }
    }

    return prisma.query.users(opArgs, info)
  },
  async me(parent, args, { prisma, request }) {
    const loggedInUser = getUserFromToken(request)
    const user = await prisma.query.user({
      where: {
        id: loggedInUser.id,
      },
    })

    return user
  },

  async myPosts(parent, args, { prisma, request }, info) {
    const user = getUserFromToken(request)

    const {
      query, first, skip, after,
    } = args

    const opArgs = {
      first,
      skip,
      after,
      where: {
        author: {
          id: user.id,
        },
      },
    }

    if (query) {
      opArgs.where.OR = [
        { title_contains: query },
        { body_contains: query },
      ]
    }

    const posts = prisma.query.posts(opArgs, info)

    return posts
  },
  async post(parent, args, { prisma, request }) {
    const author = getUserFromToken(request, false)
    const { id } = args

    const posts = await prisma.query.posts({
      where: {
        id,
        OR: [
          {
            published: true,
          },
          {
            author: {
              id: author.id,
            },
          },
        ],
      },
    })
    if (posts.length === 0) {
      throw new Error('Post not found.')
    }
    return posts[0]
  },
  posts(parent, args, { prisma }, info) {
    const {
      query, first, skip, after, orderBy,
    } = args
    const opArgs = {
      orderBy,
      where: {
        published: true,
      },
      first,
      skip,
      after,
    }

    if (query) {
      opArgs.where.OR = [
        { title_contains: query },
        { body_contains: query },
      ]
    }
    return prisma.query.posts(opArgs, info)
  },
  async comments(parent, args, { prisma }, info) {
    const { first, skip, after } = args

    const opArgs = {
      first,
      skip,
      after,
    }
    return prisma.query.comments(opArgs, info)
  },

}

export default Query
