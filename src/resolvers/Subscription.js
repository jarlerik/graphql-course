import getUserFromToken from '../auth/getUserFromToken'

const Subscription = {
  comment: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.comment(null, info)
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(null, info)
    },
  },
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const user = getUserFromToken(request)
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: user.id,
            },
          },

        },
      }, info)
    },
  },
}

export default Subscription
