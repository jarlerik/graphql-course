import bcrypt from 'bcryptjs'


const hashPassword = async (password) => {
  if (password.length < 8) {
    throw new Error('Must be 8 characters or longer.')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

export default hashPassword
