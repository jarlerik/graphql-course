const Query = {
    users(parent, args, {db, prisma }, info) {
        return prisma.query.users(null, info)
        // const {
        //     users
        // } = db
        // if (!args.query) {
        //     return users
        // } else {
        //     return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()))
        // }

    },
    getUserById(parent, args, { db }, info) {
        const { id } = args
        const user = db.users.find(user => user.id === id)
        if(!user) throw new Error('User not found')

        return user
    },
    getPostById(parent, args, ctx, info) {
        const {
            id
        } = args
        const {
            posts
        } = ctx.db
        const postIndex = posts.findIndex(post => post.id === id)
        if (postIndex === -1) throw new Error('Post not found')

        return posts[postIndex]
    },
    posts(parent, args, { prisma }, info) {
        return prisma.query.posts(null, info)
        // const {
        //     posts
        // } = ctx.db
        // const query = args.query
        // if (!query) {
        //     return posts
        // } else {
        //     return posts.filter(post => post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || post.body.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        // }
    },
    comments(parent, args, ctx, info) {
        const {
            comments
        } = ctx.db
        return comments
    }

}

export default Query