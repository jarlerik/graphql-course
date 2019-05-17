import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connect from '../helpers/connect'
import getUserFromToken from '../auth/getUserFromToken'
import getUserForToken from '../auth/getUserForToken'
import JWT_TOKEN_SECRET from '../auth/jwt_secret'

const Mutation = {

  async login(parent, args, { prisma }) {
    const loginError = 'Login failed.'

    const { email, password } = args
    const user = await prisma.query.user({
      where: {
        email,
      },
    })
    if (!user) {
      throw new Error(loginError)
    }

    const hashedPassword = user.password
    const isMatch = await bcrypt.compare(password, hashedPassword)
    if (!isMatch) {
      throw new Error(loginError)
    }
    return {
      user,
      token: jwt.sign(getUserForToken(user), JWT_TOKEN_SECRET),
    }
  },
  async createUser(parent, args, { prisma }) {
    const { password } = args.data

    if (password.length < 8) {
      throw new Error('Must be 8 characters or longer.')
    }
    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hashedPassword,
      },
    })

    return {
      user,
      token: jwt.sign(getUserForToken(user), JWT_TOKEN_SECRET),
    }
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const user = getUserFromToken(request)

    return prisma.mutation.updateUser({
      data: args.data,
      where: {
        id: user.id,
      },
    }, info)
  },
  async deleteUser(parent, args, { prisma, request }) {
    const user = getUserFromToken(request)
    return prisma.mutation.deleteUser({
      where: { id: user.id },
    })
  },
  async createPost(parent, args, { prisma, request }) {
    const user = getUserFromToken(request)
    const { data } = args

    const post = {
      title: data.title,
      body: data.body,
      published: data.body,
      author: connect(user.id),
    }

    return prisma.mutation.createPost({ data: post })
  },

  async updatePost(parent, args, { prisma, request }, info) {
    const { id, data } = args
    const user = getUserFromToken(request)

    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: user.id,
      },
    })
    if (!postExists) {
      throw Error('Unable to update post.')
    }

    return prisma.mutation.updatePost({
      data: {
        title: data.title,
        body: data.body,
        published: data.published,
      },
      where: {
        id,
      },
    }, info)
  },
  async deletePost(parent, args, { prisma, request }) {
    const { id } = args
    const user = getUserFromToken(request)

    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: user.id,
      },
    })

    if (!postExists) {
      throw new Error('Unable to delete the post.')
    }

    return prisma.mutation.deletePost({ where: { id } })
  },
  async createComment(parent, args, { prisma, request }, info) {
    const { data } = args
    const author = getUserFromToken(request)

    const comment = {
      text: data.text,
      author: connect(author.id),
      post: connect(data.post),
    }
    return prisma.mutation.createComment({ data: comment }, info)
  },

  async updateComment(parent, args, { prisma, request }) {
    const {
      id,
      data,
    } = args

    const author = getUserFromToken(request)
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: author.id,
      },
    })

    if (!commentExists) {
      throw new Error('Failed to update comment.')
    }

    return prisma.mutation.updateComment({
      data,
      where: {
        id,
      },
    })
  },
  async deleteComment(parent, args, { prisma, request }) {
    const { id } = args

    const author = getUserFromToken(request)

    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: author.id,
      },
    })

    if (!commentExists) {
      throw new Error('Unable to delete comment.')
    }

    return prisma.mutation.deleteComment({
      where: {
        id,
      },
    })
  },
}
export default Mutation
