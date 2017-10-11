var webpack = require('webpack');
var path = require('path');

module.exports = {
    cache: true,
    devtool: 'eval-source-map',
    entry: [  'babel-polyfill', './src/index.js'],
    output: {
        path:  path.resolve(__dirname, "map-sioca"),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }
            },
            {
                test: /\.json?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('"production"')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};