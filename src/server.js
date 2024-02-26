"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const btc_api_js_1 = require("./btc-api.js");
const app = (0, express_1.default)();
const port = 3000;
// Serve static files from the 'public' directory
app.use(express_1.default.static('public'));
app.get('/', async (req, res) => {
    try {
        const apiKey = 'BQY3ZAgGO2f3Jr6Yzbxphj2sowKnFl74';
        const blocks = await (0, btc_api_js_1.fetchBitcoinPrice)(apiKey);
        if (blocks !== null && blocks.length > 0) {
            const block = blocks[0]; // Assuming you want to use the first block
            const bitcoinPrice = `Bitcoin price: ${block.btcPrice}`;
            const bitcoinDifficulty = `Current Difficulty: ${block.btcDifficulty} T`;
            const bitcoinBlocks = `Latest Blocks: ${block.totalBlocks}`;
            const bitcoinTransactions = `Total TxCounts: ${block.transactionsCount}`;
            // Construct the HTML response
            const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bitcoin Dashboard</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <h1>${bitcoinPrice}</h1>
          <h1>${bitcoinDifficulty}</h1>
          <h1>${bitcoinBlocks}</h1>
          <h1>${bitcoinTransactions}</h1>
        </body>
        </html>
      `;
            res.send(htmlResponse);
        }
        else {
            res.send('<h1>Failed to fetch Bitcoin price.</h1>');
        }
    }
    catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        res.send('<h1>Error fetching Bitcoin price</h1>');
    }
});
app.get('/api/bitcoin', async (req, res) => {
    try {
        const apiKey = 'BQY3ZAgGO2f3Jr6Yzbxphj2sowKnFl74';
        const blocks = await (0, btc_api_js_1.fetchBitcoinPrice)(apiKey);
        if (blocks !== null && blocks.length > 0) {
            res.json(blocks[0]); // Respond with JSON data
        }
        else {
            res.status(404).json({ error: 'Bitcoin data not found' });
        }
    }
    catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
