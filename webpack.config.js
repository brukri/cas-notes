const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {sourceMap: true}
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                }]
            },
            {
                test: /\.html/,
                use: [{
                    loader: 'html-loader',
                    options: {sourceMap: true}
                }]
            },
            {
                test: /\.(tpl|txt)(\?.*)?$/,
                use: 'raw-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};