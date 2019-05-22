'use strict';

require('@babel/polyfill');

var _graphqlYoga = require('graphql-yoga');

var _index = require('./resolvers/index');

var _prisma = require('./prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
Scalar Types
    String
    Boolean
    Int
    Float
    ID

Query params to resolver function
    parent, args, ctx, info
 */

var pubSub = new _graphqlYoga.PubSub();

var server = new _graphqlYoga.GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: _index.resolvers,
  fragmentReplacements: _index.fragmentReplacements,
  context: function context(request) {
    return {
      pubSub: pubSub,
      prisma: _prisma2.default,
      request: request
    };
  }
});

var port = process.env.PORT || 4000;
server.start({ port: port }, function () {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:' + port);
});