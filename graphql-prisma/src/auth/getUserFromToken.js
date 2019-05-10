import jwt from 'jsonwebtoken'
import { JWT_TOKEN_SECRET } from './jwt_secret'

export const getUserFromToken = (request, authRequired = true) => {
    const header = request.request.headers.authorization

    if(header) {
        const token = header.replace('Bearer ', '')
        const user = jwt.verify(token, JWT_TOKEN_SECRET)
        return user
    }
    if(authRequired) {
        throw new Error('Authentication required.')
    }
    return {
        id: null
    }
}

export const getUserForToken = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}