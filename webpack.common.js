const CLEAN_WEBPACK_PLUGIN = require('clean-webpack-plugin');
const HTML_WEBPACK_PLUGIN = require('html-webpack-plugin');
let path = require('path');

module.exports = {
    entry: {
        indexEntry: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [

            {
                test: /\.html$/,
                use: 'html-loader'
            },

        ]

    },


    plugins: [

        new HTML_WEBPACK_PLUGIN({
            template: 'src/index.html',
            filename: './index.html'
        })
    ],
    watch: true
}