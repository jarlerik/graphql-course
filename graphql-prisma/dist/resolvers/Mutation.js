'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _connect = require('../helpers/connect');

var _connect2 = _interopRequireDefault(_connect);

var _getUserFromToken = require('../auth/getUserFromToken');

var _getUserFromToken2 = _interopRequireDefault(_getUserFromToken);

var _generateJwtToken = require('../auth/generateJwtToken');

var _generateJwtToken2 = _interopRequireDefault(_generateJwtToken);

var _hashPassword = require('../auth/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
  login: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref) {
      var prisma = _ref.prisma;
      var loginError, email, password, user, hashedPassword, isMatch;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              loginError = 'Login failed.';
              email = args.email, password = args.password;
              _context.next = 4;
              return prisma.query.user({
                where: {
                  email: email
                }
              });

            case 4:
              user = _context.sent;

              if (user) {
                _context.next = 7;
                break;
              }

              throw new Error(loginError);

            case 7:
              hashedPassword = user.password;
              _context.next = 10;
              return _bcryptjs2.default.compare(password, hashedPassword);

            case 10:
              isMatch = _context.sent;

              if (isMatch) {
                _context.next = 13;
                break;
              }

              throw new Error(loginError);

            case 13:
              return _context.abrupt('return', {
                user: user,
                token: (0, _generateJwtToken2.default)(user)
              });

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return login;
  }(),
  createUser: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3) {
      var prisma = _ref3.prisma;
      var password, hashedPassword, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              password = args.data.password;
              _context2.next = 3;
              return (0, _hashPassword2.default)(password);

            case 3:
              hashedPassword = _context2.sent;
              _context2.next = 6;
              return prisma.mutation.createUser({
                data: _extends({}, args.data, {
                  password: hashedPassword
                })
              });

            case 6:
              user = _context2.sent;
              return _context2.abrupt('return', {
                user: user,
                token: (0, _generateJwtToken2.default)(user)
              });

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createUser(_x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    }

    return createUser;
  }(),
  updateUser: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref5, info) {
      var prisma = _ref5.prisma,
          request = _ref5.request;
      var user, updateUserData;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              user = (0, _getUserFromToken2.default)(request);
              updateUserData = _extends({}, args.data);

              if (!(typeof args.data.password === 'string')) {
                _context3.next = 6;
                break;
              }

              _context3.next = 5;
              return (0, _hashPassword2.default)(args.data.password);

            case 5:
              updateUserData.password = _context3.sent;

            case 6:
              return _context3.abrupt('return', prisma.mutation.updateUser({
                data: updateUserData,
                where: {
                  id: user.id
                }
              }, info));

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function updateUser(_x7, _x8, _x9, _x10) {
      return _ref6.apply(this, arguments);
    }

    return updateUser;
  }(),
  deleteUser: function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref7) {
      var prisma = _ref7.prisma,
          request = _ref7.request;
      var user;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              user = (0, _getUserFromToken2.default)(request);
              return _context4.abrupt('return', prisma.mutation.deleteUser({
                where: { id: user.id }
              }));

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteUser(_x11, _x12, _x13) {
      return _ref8.apply(this, arguments);
    }

    return deleteUser;
  }(),
  createPost: function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args, _ref9, info) {
      var prisma = _ref9.prisma,
          request = _ref9.request;
      var user, data, post, createdPost;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              user = (0, _getUserFromToken2.default)(request);
              data = args.data;
              post = {
                title: data.title,
                body: data.body,
                published: data.published,
                author: {
                  connect: {
                    id: user.id
                  }
                }
              };
              _context5.next = 5;
              return prisma.mutation.createPost({ data: post }, info);

            case 5:
              createdPost = _context5.sent;
              return _context5.abrupt('return', createdPost);

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function createPost(_x14, _x15, _x16, _x17) {
      return _ref10.apply(this, arguments);
    }

    return createPost;
  }(),
  updatePost: function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args, _ref11, info) {
      var prisma = _ref11.prisma,
          request = _ref11.request;
      var id, data, user, post;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = args.id, data = args.data;
              user = (0, _getUserFromToken2.default)(request);
              _context6.next = 4;
              return prisma.query.posts({
                where: {
                  id: id,
                  author: {
                    id: user.id
                  }
                }
              });

            case 4:
              post = _context6.sent;

              if (post) {
                _context6.next = 7;
                break;
              }

              throw Error('Unable to update post.');

            case 7:
              if (!(post.published && !data.published)) {
                _context6.next = 10;
                break;
              }

              _context6.next = 10;
              return prisma.mutation.deleteManyComments({
                where: {
                  post: {
                    id: id
                  }
                }
              }, info);

            case 10:
              return _context6.abrupt('return', prisma.mutation.updatePost({
                data: {
                  title: data.title,
                  body: data.body,
                  published: data.published
                },
                where: {
                  id: id
                }
              }, info));

            case 11:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function updatePost(_x18, _x19, _x20, _x21) {
      return _ref12.apply(this, arguments);
    }

    return updatePost;
  }(),
  deletePost: function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args, _ref13) {
      var prisma = _ref13.prisma,
          request = _ref13.request;
      var id, user, postExists;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              id = args.id;
              user = (0, _getUserFromToken2.default)(request);
              _context7.next = 4;
              return prisma.exists.Post({
                id: id,
                author: {
                  id: user.id
                }
              });

            case 4:
              postExists = _context7.sent;

              if (postExists) {
                _context7.next = 7;
                break;
              }

              throw new Error('Unable to delete the post.');

            case 7:
              return _context7.abrupt('return', prisma.mutation.deletePost({ where: { id: id } }));

            case 8:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deletePost(_x22, _x23, _x24) {
      return _ref14.apply(this, arguments);
    }

    return deletePost;
  }(),
  createComment: function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args, _ref15, info) {
      var prisma = _ref15.prisma,
          request = _ref15.request;
      var data, author, postExists, comment;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              data = args.data;
              author = (0, _getUserFromToken2.default)(request);
              _context8.next = 4;
              return prisma.exists.Post({
                id: data.post,
                published: true
              });

            case 4:
              postExists = _context8.sent;

              if (postExists) {
                _context8.next = 7;
                break;
              }

              throw new Error('Unable to comment on post.');

            case 7:
              comment = {
                text: data.text,
                author: (0, _connect2.default)(author.id),
                post: (0, _connect2.default)(data.post)
              };
              return _context8.abrupt('return', prisma.mutation.createComment({
                data: comment
              }, info));

            case 9:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function createComment(_x25, _x26, _x27, _x28) {
      return _ref16.apply(this, arguments);
    }

    return createComment;
  }(),
  updateComment: function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args, _ref17) {
      var prisma = _ref17.prisma,
          request = _ref17.request;
      var id, data, author, commentExists;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              id = args.id, data = args.data;
              author = (0, _getUserFromToken2.default)(request);
              _context9.next = 4;
              return prisma.exists.Comment({
                id: id,
                author: {
                  id: author.id
                }
              });

            case 4:
              commentExists = _context9.sent;

              if (commentExists) {
                _context9.next = 7;
                break;
              }

              throw new Error('Failed to update comment.');

            case 7:
              return _context9.abrupt('return', prisma.mutation.updateComment({
                data: data,
                where: {
                  id: id
                }
              }));

            case 8:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function updateComment(_x29, _x30, _x31) {
      return _ref18.apply(this, arguments);
    }

    return updateComment;
  }(),
  deleteComment: function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, args, _ref19) {
      var prisma = _ref19.prisma,
          request = _ref19.request;
      var id, author, commentExists;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              id = args.id;
              author = (0, _getUserFromToken2.default)(request);
              _context10.next = 4;
              return prisma.exists.Comment({
                id: id,
                author: {
                  id: author.id
                }
              });

            case 4:
              commentExists = _context10.sent;

              if (commentExists) {
                _context10.next = 7;
                break;
              }

              throw new Error('Unable to delete comment.');

            case 7:
              return _context10.abrupt('return', prisma.mutation.deleteComment({
                where: {
                  id: id
                }
              }));

            case 8:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function deleteComment(_x32, _x33, _x34) {
      return _ref20.apply(this, arguments);
    }

    return deleteComment;
  }()
};
exports.default = Mutation;