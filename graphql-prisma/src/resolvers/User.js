import getUserFromToken from '../auth/getUserFromToken'

const User = {

  email: {

    fragment: 'userDetails',
    resolve(parent, args, { request }) {
      const user = getUserFromToken(request, false)

      if (user && user.id === parent.id) {
        return user.email
      }
      return null
    },
  },

}
export default User
