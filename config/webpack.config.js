const webpack = require('webpack');
const babelrc = require('./babel.config');

module.exports = {

    target: "web",

    // Development specific config
    devtool: '#eval-source-map',
    cache: true,
    debug: true,

    entry: {

    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].[id].chunk.js'
    },

    module : {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: babelrc
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            __DEV__: true
        }),

        new webpack.optimize.OccurenceOrderPlugin(true),

        // For HMR
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};