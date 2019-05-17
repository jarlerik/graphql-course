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
}

export default Subscription
