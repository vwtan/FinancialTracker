'use strict';

const AssetsPlugin = require('assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CONFIG = require('./webpack.common')

module.exports = {
    devtool: 'hidden-source-map',
    entry: {
        app: [
          CONFIG.CLIENT_ENTRY
        ],
        vendor: [
        'react',
        'react-dom',
      ]
    },

    output: {
      filename: '[name]_[chunkhash].js',
      chunkFilename: '[name]_[chunkhash].js',
      publicPath: CONFIG.PUBLIC_PATH,
      path: CONFIG.CLIENT_OUTPUT
    },

    module: {
        loaders: [
            {
              test: /\.scss$/,
              exclude: /node_modules/,
              loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!sass-loader'}),
            }, {
              test: /\.scss$/,
              include: /node_modules/,
              loaders: ['style-loader', 'css-loader'],
            }, {
              test: /\.jsx?$/,
              exclude: [/node_modules/, /.+\.config.js/],
              loader: 'babel-loader',
            }, {
              test: /\.json$/,
              loader: 'json-loader',
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
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production'),
            }
          }),
        new ExtractTextPlugin({filename: 'app.[chunkhash].css',  allChunks: true }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity,
          filename: 'vendor.js',
        }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
        }),
        new ManifestPlugin({
          basePath: '/',
        }),
        new ChunkManifestPlugin({
          filename: "chunk-manifest.json",
          manifestVariable: "webpackManifest",
        }),
    ]
};
