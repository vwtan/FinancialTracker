'use strict';

const AssetsPlugin = require('assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CONFIG = require('./webpack.common')


module.exports = {
    devtool: 'hidden-source-map',
    entry: {
        main: [
          CONFIG.CLIENT_ENTRY
        ],
        vendor: [
        'react',
        'react-dom',
        'react-router',
        'redux',
        'react-redux',
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
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[hash:base64]&modules&importLoaders=1!postcss-loader!sass-loader'),
            }, {
              test: /\.css$/,
              include: /node_modules/,
              loaders: ['style-loader', 'css-loader'],
            }, {
              test: /\.jsx*$/,
              exclude: [/node_modules/, /.+\.config.js/],
              loader: 'babel',
            }, {
              test: /\.json$/,
              loader: 'json-loader',
            },
          ],
    },

        resolve: {
        extensions: ['', '.js', '.jsx'],
        modules: [
          'client',
          'node_modules',
        ],
      },

    // Process the CSS with PostCSS
    postcss: () => [
        require('postcss-focus')(),
        require('postcss-cssnext')({
            browsers: ['last 2 versions', 'ie > 10']
        }),
        require('postcss-reporter')({ // Posts messages from plugins to the terminal
            clearMessages: true
        })
    ],

    plugins: [
      new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production'),
          }
        }),
        new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor_[hash].js', 2),
        new AssetsPlugin({ filename: 'assets.json' }),
        new webpack.optimize.DedupePlugin(),
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
        new webpack.NoErrorsPlugin(),
        new ManifestPlugin({
          basePath: '/',
        }),
        new ChunkManifestPlugin({
          filename: "chunk-manifest.json",
          manifestVariable: "webpackManifest",
        }),
    ]
};
