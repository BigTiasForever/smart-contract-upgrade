import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";

const config: HardhatUserConfig = {
 solidity: "0.8.28",
 gasReporter: {
  currency: "EUR",
  token: "POL",
  gasPriceApi: process.env.COIN_MARKET_API,
  coinmarketcap: process.env.COIN_MARKET_API,
  gasPrice: 3,
  enabled: true,
 },
 sourcify: {
  enabled: true,
 },
 networks: {
  sepolia: {
   url: process.env.SEPOLIA_API_KEY,
   accounts: [process.env.ACCOUNT_KEY as string],
  },
 },
 etherscan: {
  apiKey: {
   sepolia: process.env.ETHERSCAN_API_KEY as string,
  },
 },
};

export default config;
