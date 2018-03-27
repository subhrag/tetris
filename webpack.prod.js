const webpack = require('webpack');
const merge = require('webpack-merge');
//const path = require('path');

const commonConfig = require('./webpack.common.js');
const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin');
const COPY_WEBPACK_PLUGIN = require('copy-webpack-plugin');

module.exports = merge(commonConfig, {

    // devtool: 'source-map',
    module: {
        rules: [

            {
                test: /\.scss$/,
                use: EXTRACT_TEXT_PLUGIN.extract({
                    //fallback: 'style-loader', 
                    use: ['css-loader?url=false', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]',
                        // name: path.join('../img/', '[name].[ext]')
                        outputPath: 'img/'

                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }

        ]
    },
    plugins: [

        new EXTRACT_TEXT_PLUGIN({
            filename: 'css/[name].style.css'
        }),
        new COPY_WEBPACK_PLUGIN([
            { from: 'src/img', to: 'img' }
        ])

    ]
})