const { merge } = require('webpack-merge');
const rogueConfig = require('./webpack.config.rogue');
const userConfig = require('./webpack.config.user');

module.exports = merge(rogueConfig, userConfig);
