const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        app: path.resolve(__dirname, 'src/js/main.js'),
    },
    output: {
        path: path.resolve('build'),
        filename: '[name].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!' + path.resolve(__dirname, `src/templates/ejs/pages/home.ejs`),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
            },
        ],
    },
    devServer: {
        contentBase: [path.resolve('./build')],
        watchContentBase: true,
        open: false,
        writeToDisk: true,
    },
}
