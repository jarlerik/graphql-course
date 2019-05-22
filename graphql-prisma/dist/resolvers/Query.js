'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUserFromToken = require('../auth/getUserFromToken');

var _getUserFromToken2 = _interopRequireDefault(_getUserFromToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  users: function users(parent, args, _ref, info) {
    var prisma = _ref.prisma;
    var query = args.query;

    var opArgs = {};

    if (query) {
      opArgs.where = {
        OR: [{ name_contains: query }, { email_contains: query }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref2) {
      var prisma = _ref2.prisma,
          request = _ref2.request;
      var loggedInUser, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              loggedInUser = (0, _getUserFromToken2.default)(request);
              _context.next = 3;
              return prisma.query.user({
                where: {
                  id: loggedInUser.id
                }
              });

            case 3:
              user = _context.sent;
              return _context.abrupt('return', user);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function me(_x, _x2, _x3) {
      return _ref3.apply(this, arguments);
    }

    return me;
  }(),
  myPosts: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref4, info) {
      var prisma = _ref4.prisma,
          request = _ref4.request;
      var user, query, first, skip, after, opArgs, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = (0, _getUserFromToken2.default)(request);
              query = args.query, first = args.first, skip = args.skip, after = args.after;
              opArgs = {
                first: first,
                skip: skip,
                after: after,
                where: {
                  author: {
                    id: user.id
                  }
                }
              };


              if (query) {
                opArgs.where.OR = [{ title_contains: query }, { body_contains: query }];
              }

              posts = prisma.query.posts(opArgs, info);
              return _context2.abrupt('return', posts);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function myPosts(_x4, _x5, _x6, _x7) {
      return _ref5.apply(this, arguments);
    }

    return myPosts;
  }(),
  post: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref6) {
      var prisma = _ref6.prisma,
          request = _ref6.request;
      var author, id, posts;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              author = (0, _getUserFromToken2.default)(request, false);
              id = args.id;
              _context3.next = 4;
              return prisma.query.posts({
                where: {
                  id: id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: author.id
                    }
                  }]
                }
              });

            case 4:
              posts = _context3.sent;

              if (!(posts.length === 0)) {
                _context3.next = 7;
                break;
              }

              throw new Error('Post not found.');

            case 7:
              return _context3.abrupt('return', posts[0]);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function post(_x8, _x9, _x10) {
      return _ref7.apply(this, arguments);
    }

    return post;
  }(),
  posts: function posts(parent, args, _ref8, info) {
    var prisma = _ref8.prisma;
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;

    var opArgs = {
      orderBy: orderBy,
      where: {
        published: true
      },
      first: first,
      skip: skip,
      after: after
    };

    if (query) {
      opArgs.where.OR = [{ title_contains: query }, { body_contains: query }];
    }
    return prisma.query.posts(opArgs, info);
  },
  comments: function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref9, info) {
      var prisma = _ref9.prisma;
      var first, skip, after, opArgs;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              first = args.first, skip = args.skip, after = args.after;
              opArgs = {
                first: first,
                skip: skip,
                after: after
              };
              return _context4.abrupt('return', prisma.query.comments(opArgs, info));

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function comments(_x11, _x12, _x13, _x14) {
      return _ref10.apply(this, arguments);
    }

    return comments;
  }()
};

exports.default = Query;