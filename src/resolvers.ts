import { QueryResolvers } from './generated/graphql';

const resolvers: QueryResolvers = {
  Query: {
    bitcoinHeader: () => {
      // Implement logic to fetch data from Bitquery API
      // and return the necessary fields
      return {
        price: '$51,617.00',
        hashrate: '559.97 EH/s',
        difficulty: '81.73 T',
        latestBlocks: '831,488',
        difficultyAdjust: '8 days 2 hrs',
        txCounts: '359,313',
        nextDifficulty: '78.59 T -3.84%',
      };
    },
  },
};

export { resolvers };
