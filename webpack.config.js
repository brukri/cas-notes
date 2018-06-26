const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './server/public')
    },
    devtool: 'eval-source-map',
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
            // {
            //     test: /\.css$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         "css-loader"
            //     ]
            // },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {sourceMap: true}
                }]
            },
            {
                test: /\.handlebars$/,
                use: 'handlebars-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "./server/public"),
        compress: true,
        port: 9000
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.js'
        }
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyWebpackPlugin([
            {from: './client/index.html', to: 'index.html', toType: 'file'},
            {from: './client/styles/', to: './styles/', toType: 'dir'}
        ], {}),
        new CleanWebpackPlugin([path.resolve(__dirname, './server/public')]),
    ]
};