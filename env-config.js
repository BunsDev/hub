/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  INFURA_API_KEY: process.env.INFURA_API_KEY,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NETWORK_ID: process.env.NETWORK_ID || 3,
  IPFS_PROVIDER: process.env.IPFS_PROVIDER || "http://127.0.0.1:5001",
  IPFS_GATEWAY: process.env.IPFS_GATEWAY || "http://127.0.0.1:8080/ipfs/",
};
