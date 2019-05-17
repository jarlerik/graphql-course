import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/prisma/dev',
  secret: 'supersecretvalue',
  fragmentReplacements,
})

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({ id: postId })
//     if(!postExists) {
//         throw new Error('Post not found')
//     }
//      const updatedPost = await prisma.mutation.updatePost({
//          data,
//          where: {
//              id: postId
//          }
//      }, '{ author { id name email posts {id title } } }')
//      return updatedPost
// }

// updatePostForUser('sfsfsdfd', {
//     title: 'Update from async function',
//     published: false
// })
//     .then(user => console.log(JSON.stringify(user, undefined, 2)))
//     .catch(error => { console.log(`Error: ${error.message}`) } )

export default prisma
