import jwt from 'jsonwebtoken'
import getUserForToken from './getUserForToken'
import JWT_TOKEN_SECRET from './jwt_secret'

const generateJwtToken = user => jwt.sign(getUserForToken(user), JWT_TOKEN_SECRET)

export default generateJwtToken
