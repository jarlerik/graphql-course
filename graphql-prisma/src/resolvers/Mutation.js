const uuidv4 = require('uuid/v4')
import {
    POST_EVENTS,
    COMMENT_EVENTS
} from '../constants';

const Mutation = {
    createUser(parent, args, ctx, info) {
        const {
            data
        } = args
        const emailTaken = ctx.db.users.some(user => user.email === data.email)
        if (emailTaken) {
            throw new Error('Email is taken.')
        } else {
            const user = {
                id: uuidv4(),
                ...data
            }
            ctx.db.users.push(user)
            return user
        }
    },
    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find(user => user.id === id)

        if(!user) throw new Error('User not found')

        if(typeof data.email === 'string') {
            const emailTaken = db.users.some(user => user.id === data.email)

            if(emailTaken) throw new Error('Email is taken')
        
            user.email = data.email
        }
        if(typeof data.name === 'string') {
            user.name = data.name
        }
        if(typeof data.age !== undefined) {
            user.age = parseInt(data.age)
        }
        return user
    },
    deleteUser(parent, args, ctx, info) {
        const userId = args.id
        const userIndex = ctx.db.users.findIndex(user => user.id === userId)

        if (userIndex === -1) {
            throw new Error('User not found.')
        }

        const deletedUsers = ctx.db.users.splice(userIndex, 1)

        ctx.db.posts = ctx.db.posts.filter(post => {
            const match = post.author === userId
            if (match) {
                ctx.db.comments = ctx.db.comments.filter(comment => comment.post !== post.id)
            }
            return !match
        })
        ctx.db.comments = ctx.db.comments.filter(comment => comment.author !== userId)
        return deletedUsers[0]
    },
    createPost(parent, args, { pubSub, db }, info) {
        const {
            data
        } = args
        const userExists = db.users.some(user => user.id === data.author)

        if (!userExists) throw new Error('User not found.')

        const post = {
            id: uuidv4(),
            ...data
        }
        db.posts.push(post)
        if(post) {
            pubSub.publish('POST', {
                post: {
                    mutation: POST_EVENTS.created,
                    data: post
                }
            })
        }
        return post

    },

    updatePost(parent, args, { db, pubSub }, info) {
       
         const { id, data } = args
         const postToUpdate = db.posts.find(post => post.id === id)
         if(!postToUpdate) throw new Error('Post not found')

         if(typeof data.title === 'string') {
             postToUpdate.title = data.title

         }
         if (typeof data.body === 'string') {
             postToUpdate.body = data.body
         }
         if(typeof data.published === 'boolean') {
             postToUpdate.published = data.published
             const publishingEvent = postToUpdate.published ? POST_EVENTS.published : POST_EVENTS.unpublished
         }

         pubSub.publish('POST', {
             post: {
                 mutation: POST_EVENTS.updated,
                 data: postToUpdate
             }
         })

         return postToUpdate
    },
    deletePost(parent, args, {db, pubSub }, info) {
        const postId = args.id
        const postIndex = db.posts.findIndex(post => post.id === postId)

        if (postIndex === -1) throw new Error('Post not found.')

        const deletedPost = db.posts[postIndex]
        db.comments = db.comments.filter(comment => comment.post !== deletedPost.id)
        db.posts = db.posts.filter(post => post.id !== postId)
        if(deletedPost.published) {
            pubSub.publish('POST', {
                post: {
                    mutation: POST_EVENTS.deleted,
                    data: deletedPost
                }
            })
        }

        return deletedPost
    },
    createComment(parent, args, { db, pubSub }, info) {
        const {
            data
        } = args
        const userExists = db.users.some(user => user.id === data.author)
        const postExists = db.posts.some(post => post.id === data.post)
        if (!userExists) throw new Error('User not found.')
        if (!postExists) throw new Error('Post not found')

        const comment = {
            id: uuidv4(),
            ...data
        }
        db.comments.push(comment)
        pubSub.publish('COMMENT', {
            comment: {
                mutation: COMMENT_EVENTS.created,
                data: comment
            }
        })
        return comment
    },

    updateComment(parent, args, { db, pubSub }, info) {
        const { id, data } = args
        const commentToUpdate = db.comments.find(comment => comment.id === id)

        if(!commentToUpdate) throw new Error('Comment not found')

        if(typeof data.text === 'string') {
            commentToUpdate.text = data.text
        }

        pubSub.publish('COMMENT', {
            comment: {
                mutation: COMMENT_EVENTS.updated,
                data: commentToUpdate
            }
            
        })
        return commentToUpdate
    },
    deleteComment(parent, args, {db, pubSub }, info) {
        const commentId = args.id
        const commentIndex = db.comments.findIndex(comment => comment.id === commentId)
        if (commentIndex === -1) throw new Error('Comment not found.')
        const deletedComment = db.comments[commentIndex]
        db.comments = db.comments.filter(comment => comment.id !== commentId)
        pubSub.publish('COMMENT', {
            comment: {
                 mutation: COMMENT_EVENTS.deleted,
                 data: deletedComment
            }
        })
        return deletedComment
    }
}
export default Mutation