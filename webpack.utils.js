const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin')

module.exports.initWebpackHtmlWithDir = function (dirPath) {
    const files = fs.readdirSync(dirPath).reduce((arr, file) => {
        if (file.match(/\.(ejs|pug|hds|handlebars|njk|nunjucks)$/i)) {
            arr.push(
                new HtmlWebpackPlugin({
                    filename: file,
                    template: path.resolve(__dirname, dirPath + '/' + file),
                }),
            )
        }

        if (file.match(/\.(njk|nunjucks)$/i)) {
            arr.push(
                new NunjucksWebpackPlugin({
                    templates: [
                        {
                            from: path.resolve(__dirname, dirPath + '/' + file),
                            to: file,
                        },
                    ],
                }),
            )
        }

        return arr
    }, [])

    return files
}
