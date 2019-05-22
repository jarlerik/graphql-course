'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUserFromToken = require('../auth/getUserFromToken');

var _getUserFromToken2 = _interopRequireDefault(_getUserFromToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = {
  comment: {
    subscribe: function subscribe(parent, args, _ref, info) {
      var prisma = _ref.prisma;

      return prisma.subscription.comment(null, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, args, _ref2, info) {
      var prisma = _ref2.prisma;

      return prisma.subscription.post(null, info);
    }
  },
  myPost: {
    subscribe: function subscribe(parent, args, _ref3, info) {
      var prisma = _ref3.prisma,
          request = _ref3.request;

      var user = (0, _getUserFromToken2.default)(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: user.id
            }
          }

        }
      }, info);
    }
  }
};

exports.default = Subscription;