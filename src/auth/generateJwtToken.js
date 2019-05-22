import jwt from 'jsonwebtoken'
import getUserForToken from './getUserForToken'

const generateJwtToken = user => jwt.sign(getUserForToken(user), process.env.JWT_SECRET)

export default generateJwtToken
