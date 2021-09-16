/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  INFURA_API_KEY: process.env.INFURA_API_KEY,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NETWORK_ID: process.env.NETWORK_ID || 3,
  IPFS_UPLOAD_ENDPOINT: process.env.IPFS_UPLOAD_ENDPOINT || '',
  IPFS_API_KEY: process.env.IPFS_API_KEY,
  IPFS_SECRET_API_KEY: process.env.IPFS_SECRET_API_KEY,
  IPFS_GATEWAY: process.env.IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/',
}
