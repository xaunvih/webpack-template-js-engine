const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DEV_MODE = process.env.npm_lifecycle_event == 'start'
const { initWebpackHtmlWithDir } = require('./webpack.utils')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        app: path.resolve(__dirname, 'src/js/main.js'),
    },
    resolve: {
        extensions: ['.js', '.json', '.hbs', '.handlebars', '.ejs'],
        alias: {
            scss: path.resolve(__dirname, 'src/scss'),
        },
    },
    output: {
        path: path.resolve('build'),
        filename: '[name].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...initWebpackHtmlWithDir('src/templates/ejs'),
        ...initWebpackHtmlWithDir('src/templates/handlebar'),
        ...initWebpackHtmlWithDir('src/templates/pug'),
        ...initWebpackHtmlWithDir('src/templates/nunjuck'),
    ],
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: ['html-loader', 'ejs-html-loader'],
            },
            {
                test: /\.pug$/,
                loader: ['raw-loader', 'pug-html-loader'],
            },
            {
                test: /\.(hbs|handlebars)$/,
                loader: ['raw-loader', 'handlebars-loader'],
            },
            {
                test: /\.njk$/,
                loader: 'raw-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve('src/js'),
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                },
            },
            {
                test: /\.(scss)/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: DEV_MODE,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: DEV_MODE,
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        contentBase: [path.resolve('./build')],
        watchContentBase: true,
        open: true,
        writeToDisk: true,
        compress: true,
        hot: true,
    },
}
