/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  INFURA_API_KEY: process.env.INFURA_API_KEY,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NEXT_PUBLIC_NETWORK_ID: process.env.NEXT_PUBLIC_NETWORK_ID || 3,
  NEXT_PUBLIC_IPFS_UPLOAD_ENDPOINT:
    process.env.NEXT_PUBLIC_IPFS_UPLOAD_ENDPOINT,
  NEXT_PUBLIC_IPFS_API_KEY: process.env.NEXT_PUBLIC_IPFS_API_KEY,
  NEXT_PUBLIC_IPFS_SECRET_API_KEY: process.env.NEXT_PUBLIC_IPFS_SECRET_API_KEY,
  NEXT_PUBLIC_IPFS_GATEWAY: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
};
