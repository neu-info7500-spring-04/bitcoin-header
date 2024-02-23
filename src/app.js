"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const btc_api_1 = require("./btc-api");
const App = () => {
    const [bitcoinPrice, setBitcoinPrice] = (0, react_1.useState)(null);
    const apiKey = 'BQY3ZAgGO2f3Jr6Yzbxphj2sowKnFl74'; // Replace 'YOUR_API_KEY' with your actual API key
    (0, react_1.useEffect)(() => {
        (0, btc_api_1.fetchBitcoinPrice)(apiKey)
            .then((price) => {
            setBitcoinPrice(price);
        })
            .catch((error) => {
            console.error('Failed to fetch Bitcoin price:', error);
        });
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Bitcoin Price"),
        bitcoinPrice !== null ? (react_1.default.createElement("p", null,
            "$",
            bitcoinPrice.toFixed(2))) : (react_1.default.createElement("p", null, "Loading..."))));
};
exports.default = App;
