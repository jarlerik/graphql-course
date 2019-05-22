'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUserFromToken = require('../auth/getUserFromToken');

var _getUserFromToken2 = _interopRequireDefault(_getUserFromToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {

  email: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, _ref) {
      var request = _ref.request;

      var user = (0, _getUserFromToken2.default)(request, false);

      if (user && user.id === parent.id) {
        return user.email;
      }
      return null;
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, _ref2) {
      var prisma = _ref2.prisma;

      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      });
    }
  }
};
exports.default = User;