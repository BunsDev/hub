const env = require("./env-config.js");

module.exports = {
  env,
  webpack5: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
};
