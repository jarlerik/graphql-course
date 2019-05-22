"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connect;
function connect(relationId) {
  return {
    connect: {
      id: relationId
    }
  };
}