"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getUserForToken = function getUserForToken(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
};

exports.default = getUserForToken;