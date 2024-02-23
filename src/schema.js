"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
  type Query {
    bitcoinHeader: BitcoinHeader!
  }

  type BitcoinHeader {
    price: String!
    hashrate: String!
    difficulty: String!
    latestBlocks: String!
    difficultyAdjust: String!
    txCounts: String!
    nextDifficulty: String!
  }
`;
