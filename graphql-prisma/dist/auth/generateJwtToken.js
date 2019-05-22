'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _getUserForToken = require('./getUserForToken');

var _getUserForToken2 = _interopRequireDefault(_getUserForToken);

var _jwt_secret = require('./jwt_secret');

var _jwt_secret2 = _interopRequireDefault(_jwt_secret);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateJwtToken = function generateJwtToken(user) {
  return _jsonwebtoken2.default.sign((0, _getUserForToken2.default)(user), _jwt_secret2.default);
};

exports.default = generateJwtToken;