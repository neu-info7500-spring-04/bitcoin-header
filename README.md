# bitcoin-header
This component of the project is a simple web application that tracks the current price of Bitcoin (BTC) and provides information about the latest blocks and transaction counts. The application uses the Bitquery API to fetch blockchain data and the Coinbase API to fetch the current BTC price.


## Installation


Clone the repository:
```
git clone https://github.com/your-username/bitcoin-price-tracker.git
```


Install dependencies:
```
cd bitcoin-header
npm install
```


Usage
```
Set your API key in btc-api.ts:

const apiKey = 'YOUR_API_KEY';
```


Compile TypeScript files:
```
npm run build
cd src
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
tsc
node server.js
```
Open your browser and visit http://localhost:3000 to see the Bitcoin price, current difficulty, latest blocks, and total transaction counts.

## Technologies Used

Node.js


Express.js


TypeScript


Axios


## Credits


[Bitquery API](https://bitquery.io/)


[Coinbase API](https://docs.cloud.coinbase.com/exchange/docs/welcome)
