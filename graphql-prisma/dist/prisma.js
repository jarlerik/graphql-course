'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prismaBinding = require('prisma-binding');

var _index = require('./resolvers/index');

var prisma = new _prismaBinding.Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'supersecretvalue',
  fragmentReplacements: _index.fragmentReplacements
});

exports.default = prisma;