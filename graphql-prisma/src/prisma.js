import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/prisma/dev',
    secret: 'supersecretvalue'
})


// prisma.query.comments(null, '{ id text author { id name email} }')
//     .then(data => {
//         console.log(JSON.stringify(data, undefined, 2))
//     })

// prisma.mutation.updatePost({
//     where: {
//         id: "cjvdq14ow00vv0887da1uppd6"
//     },
//     data: {
//         body: "Update from node with prisma-binding",
//         published: false
//     }
    
// }, '{ id title published body author {id name} }')
//     .then(data => {
//         return prisma.query.posts(null, '{ id title body published }')
//     })
//     .then(data => {
//         console.log(JSON.stringify(data, undefined, 2))
//     })

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })
    if(!postExists) {
        throw new Error('Post not found')
    }
     const updatedPost = await prisma.mutation.updatePost({
         data,
         where: {
             id: postId
         }
     }, '{ author { id name email posts {id title } } }')
     return updatedPost
}

// updatePostForUser('sfsfsdfd', {
//     title: 'Update from async function',
//     published: false
// })
//     .then(user => console.log(JSON.stringify(user, undefined, 2)))
//     .catch(error => { console.log(`Error: ${error.message}`) } )

export default prisma
