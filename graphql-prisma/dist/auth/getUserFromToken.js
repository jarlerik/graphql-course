'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUserFromToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwt_secret = require('./jwt_secret');

var _jwt_secret2 = _interopRequireDefault(_jwt_secret);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserFromToken(request) {
  var authRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (header) {
    var token = header.replace('Bearer ', '');
    var user = _jsonwebtoken2.default.verify(token, _jwt_secret2.default);
    return user;
  }
  if (authRequired) {
    throw new Error('Authentication required.');
  }
  return {
    id: null
  };
}