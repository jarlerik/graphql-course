import jwt from 'jsonwebtoken'

export default function getUserFromToken(request, authRequired = true) {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization

  if (header) {
    const token = header.replace('Bearer ', '')
    const user = jwt.verify(token, process.env.JWT_SECRET)
    return user
  }
  if (authRequired) {
    throw new Error('Authentication required.')
  }
  return {
    id: null,
  }
}
