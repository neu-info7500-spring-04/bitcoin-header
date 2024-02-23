"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBitcoinPrice = void 0;
const axios_1 = __importDefault(require("axios"));
async function fetchBitcoinPrice(apiKey) {
    const url = 'https://graphql.bitquery.io/';
    // Calculate the date and time 24 hours ago
    const twentyFourHoursAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    // Format the date and time as an ISO 8601 string
    const isoString = twentyFourHoursAgo.toISOString();
    console.log("isos::", isoString);
    //const twentyFourHoursAgo = new Date(Date.now() - 2* 24 * 60 * 60 * 1000);
    //const torontoTimeString = twentyFourHoursAgo.toLocaleString('en-US', { timeZone: 'America/Toronto' });
    //const twentyFourHoursAgoToronto = new Date(torontoTimeString);
    //const isoString = twentyFourHoursAgoToronto.toISOString();
    console.log("time:", isoString);
    try {
        const graphqlResponse = await axios_1.default.post(url, {
            query: `
        {
          bitcoin {
            transactions(date: { after: "${isoString}" }) {
              count
            }
            blocks(options: { limit: 1, desc: "timestamp.iso8601" }) {
              blockHash
              difficulty
              height
              timestamp {
                iso8601
              }
              transactionCount 
            }
          }
        }
      `,
            variables: {},
        }, {
            headers: {
                'X-API-KEY': apiKey,
            },
        });
        const transactions = graphqlResponse.data?.data?.bitcoin?.transactions;
        console.log("trans::", transactions);
        const transactionsCount = transactions.reduce((sum, tx) => sum + tx.count, 0);
        console.log('Transactions Count in the Last 24 Hours:', transactionsCount);
        const response1 = await axios_1.default.get('https://api.coinbase.com/v2/prices/BTC-USD/buy');
        const btcPrice = response1.data.data.amount;
        console.log("BTC Price:", btcPrice);
        const blocks = graphqlResponse.data?.data?.bitcoin?.blocks;
        if (Array.isArray(blocks)) {
            // Process each block
            const transformedBlocks = blocks.map((block) => {
                console.log('Block Hash:', block.blockHash);
                const difficultyTera = block.difficulty / 1e12;
                const btcDifficulty = parseFloat(difficultyTera.toFixed(2));
                console.log('Difficulty:', btcDifficulty, 'T');
                console.log('Timestamp:', block.timestamp.iso8601);
                const totalBlocks = block.height;
                console.log('Blocks:', totalBlocks);
                const btcTransactionCount = block.transactionCount;
                console.log('Transaction Count:', transactionsCount);
                return { btcPrice, btcDifficulty, totalBlocks, transactionsCount };
            });
            return transformedBlocks;
        }
        else {
            console.error('Invalid response format:', graphqlResponse.data);
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching Bitcoin data:', error);
        throw error;
    }
}
exports.fetchBitcoinPrice = fetchBitcoinPrice;
// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'BQY3ZAgGO2f3Jr6Yzbxphj2sowKnFl74';
fetchBitcoinPrice(apiKey)
    .then((blocks) => {
    if (blocks !== null) {
        console.log('Blocks:', blocks);
        return null;
    }
})
    .catch((error) => {
    console.error('Failed to fetch Bitcoin data:', error);
});
