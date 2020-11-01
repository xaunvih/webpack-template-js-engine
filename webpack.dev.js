const path = require('path')
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')

module.exports = merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: [path.resolve('./build')],
        watchContentBase: true,
        open: true,
        writeToDisk: true,
    },
})
