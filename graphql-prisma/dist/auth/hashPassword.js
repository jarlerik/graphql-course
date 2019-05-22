'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var hashPassword = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
    var hashedPassword;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(password.length < 8)) {
              _context.next = 2;
              break;
            }

            throw new Error('Must be 8 characters or longer.');

          case 2:
            _context.next = 4;
            return _bcryptjs2.default.hash(password, 10);

          case 4:
            hashedPassword = _context.sent;
            return _context.abrupt('return', hashedPassword);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = hashPassword;