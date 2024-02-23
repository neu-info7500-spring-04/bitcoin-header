"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const btc_api_js_1 = require("./btc-api.js"); // Update this with the correct path to your fetchBitcoinPrice function
const app = (0, express_1.default)();
const port = 3000;
app.get('/', async (req, res) => {
    try {
        const apiKey = 'BQY3ZAgGO2f3Jr6Yzbxphj2sowKnFl74'; // Replace with your actual API key
        const blocks = await (0, btc_api_js_1.fetchBitcoinPrice)(apiKey);
        if (blocks !== null && blocks.length > 0) {
            const bitcoinPrice = `Bitcoin price: ${blocks[0].btcPrice}`;
            const bitcoinDifficulty = `Current Difficulty: ${blocks[0].btcDifficulty} T`;
            const bitcoinBlocks = `Latest Blocks: ${blocks[0].totalBlocks}`;
            const bitcoinTransactions = `Total TxCounts: ${blocks[0].transactionsCount}`;
            // Concatenate all the information into a single string
            const responseString = `<h1>${bitcoinPrice}</h1><h1>${bitcoinDifficulty}</h1><h1>${bitcoinBlocks}</h1><h1>${bitcoinTransactions}</h1>`;
            // Send the concatenated string as the response
            res.send(responseString);
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
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
