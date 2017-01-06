'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CONFIG = require('./webpack.common')
const serverConfig = require('../server/config')

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: [
          'eventsource-polyfill',
          `webpack-hot-middleware/client?http://127.0.0.1:${process.env.PORT || serverConfig.port}/`,
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
          CLIENT_ENTRY
        ],
        vendor: [
        'react',
        'react-dom',
      ]
    },

    output: {
      filename: 'app.js',
      publicPath: `http://127.0.0.1:${process.env.PORT || serverConfig.port}/`,
      path: CLIENT_OUTPUT
    },

    module: {
        loaders: [
            {
              test: /\.scss$/,
              exclude: /node_modules/,
              loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!sass-loader',
            }, {
              test: /\.css$/,
              include: /node_modules/,
              loaders: ['style-loader', 'css-loader'],
            }, {
              test: /\.jsx*$/,
              exclude: [/node_modules/, /config/],
              loader: 'babel-loader',
            }, {
              test: /\.json$/,
              loader: 'json-loader',
            }, {
              test: /\.(jpe?g|gif|png|svg)$/i,
              loader: 'url-loader?limit=10000',
            },
          ],
    },

        resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
          'client',
          'node_modules',
        ],
      },


    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js',
          }),
        new webpack.DefinePlugin({
          'process.env': {
            CLIENT: JSON.stringify(true),
            'NODE_ENV': JSON.stringify('development'),
          }
        }),
    ]
};
