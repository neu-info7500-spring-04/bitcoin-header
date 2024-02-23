import axios from 'axios';

export async function fetchBitcoinPrice(apiKey: string): Promise<{ btcPrice: number, btcDifficulty: number, totalBlocks: number, transactionsCount: number }[] | null> {
  const url = 'https://graphql.bitquery.io/';

  // Calculate the date and time 24 hours ago
  const twentyFourHoursAgo = new Date(Date.now() - 2* 24 * 60 * 60 * 1000);


  // Format the date and time as an ISO 8601 string
  const isoString = twentyFourHoursAgo.toISOString();
  console.log("isotime::", isoString);

  try {
    const graphqlResponse = await axios.post(url, {
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
    const transactionsCount = transactions.reduce((sum: number, tx: { count: number; }) => sum + tx.count, 0);
    console.log('Transactions Count in the Last 24 Hours:', transactionsCount);
    const response1 = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/buy');
    const btcPrice = response1.data.data.amount;
    console.log("BTC Price:", btcPrice);
    const blocks = graphqlResponse.data?.data?.bitcoin?.blocks;
    if (Array.isArray(blocks)) {
      // Process each block
      const transformedBlocks = blocks.map((block: {
        [x: string]: any; value: any; blockHash: any; difficulty: any; timestamp: any; transactionCount: any; 
      }) => {
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

    } else {
      console.error('Invalid response format:', graphqlResponse.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    throw error;
  }
}

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
