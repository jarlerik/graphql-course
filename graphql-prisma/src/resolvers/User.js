import getUserFromToken from '../auth/getUserFromToken'

const User = {

  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }) {
      const user = getUserFromToken(request, false)

      if (user && user.id === parent.id) {
        return user.email
      }
      return null
    },
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma }) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id,
          },
        },
      })
    },
  },
}
export default User
