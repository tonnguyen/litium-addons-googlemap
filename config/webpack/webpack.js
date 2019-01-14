const webpack = require('webpack');
const helpers = require('../helpers');
const distPath = helpers.root('dist');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const moduleName = 'GoogleMapAddOn';

module.exports = {
    // keep the mode development, otherwise component factory's name will be minified
    // and dynamic component creator will not be able to find it.
    mode: 'development',
    context: __dirname,
    target: 'web',
    entry: {
        [moduleName]: [helpers.root('src/' + moduleName + '/extensions.ts')],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    emitErrors: true,
                    failOnHint: false
                }
            },
            {
                test: /\.(ts)$/,
                use: ['happypack/loader?id=ts'],
                exclude: /node_modules/
            },
            {
                test: /\.(js)$/,
                use: ['happypack/loader?id=js'],
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                use: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(html)$/,
                use: ['raw-loader']
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                use: 'url?limit=10000'
            }
        ]
    },
    optimization: {
        namedModules: true,
        namedChunks: true,
        // set runtimeChunk to true to generate the runtime Accelerator file, to move webpackBootstrap
        // to runtime file, keeping Accelerator.js to clean, to not containing webpackBootstrap.
        // The dynamic component loading would not work if Accelerator.js contains webpackBootstrap
        runtimeChunk: {
            // name it as manifest then we will re-use the Litium Web's runtime
            name: 'manifest'
        },
        splitChunks: {
            // move everything under node_modules to vendor.js, but:
            // excluding litium-ui
            // embed tonnguyen-agm-core (external dependency) in GoogleMapAddOn.js
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](?!(tonnguyen-agm-core|rxjs-compat|rxjs)).*[\\/]/,
                    name: "vendor",
                    chunks: "all"
                },
                'litium-ui': {
                    test: /[\\/]litium-ui[\\/]/,
                    name: "litium-ui",
                    chunks: "all"
                }
            }
        }
    },
    output: {
        path: distPath,
        publicPath: '/Litium/Client/Scripts/dist/'
    },
    plugins: [
        new HappyPack({
            id: 'ts',
            threads: 4,
            loaders: ['babel-loader', { path: 'ts-loader', query: { happyPackMode: true } }, 'angular2-template-loader', 'angular2-router-loader']
        }),
        new HappyPack({
            id: 'js',
            threads: 2,
            loaders: ['babel-loader']
        }),
        new ForkTsCheckerWebpackPlugin({ tsconfig: helpers.root('tsconfig.json') }),
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        modules: [
            helpers.root("node_modules"),
            helpers.root("src/" + moduleName)
        ],
        extensions: ['.ts', '.js', '.json']
    }
};