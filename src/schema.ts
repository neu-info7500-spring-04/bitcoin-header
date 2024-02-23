import { gql } from 'apollo-server';

export const typeDefs = gql`
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
