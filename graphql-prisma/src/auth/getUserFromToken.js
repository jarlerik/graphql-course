import jwt from 'jsonwebtoken'
import JWT_TOKEN_SECRET from './jwt_secret'

export default function getUserFromToken(request, authRequired = true) {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization

  if (header) {
    const token = header.replace('Bearer ', '')
    const user = jwt.verify(token, JWT_TOKEN_SECRET)
    return user
  }
  if (authRequired) {
    throw new Error('Authentication required.')
  }
  return {
    id: null,
  }
}
