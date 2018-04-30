const webpack = require('webpack');
const helpers = require('../helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var distPath = helpers.root('dist');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
var path = require('path');

const moduleName = 'GoogleMapAddOn';

module.exports = {
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
                use: ['babel-loader', 'ts-loader', 'angular2-template-loader', 'angular2-router-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(js)$/,
                use: ['babel-loader'],
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
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                use: 'url?limit=10000'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: distPath,
        chunkFilename: '[name].js',
        publicPath: '/Litium/Client/Scripts/dist/'
    },
    plugins: [
        // new HardSourceWebpackPlugin({ cacheDirectory: helpers.root('node_modules/.cache/hard-source/[confighash]')}),
        new CleanWebpackPlugin([distPath], { root: helpers.root('.') }),
        new DefinePlugin({
            'ENV': JSON.stringify(process.env.ENV),
            'process.env': {
                'ENV': JSON.stringify(process.env.ENV),
                'NODE_ENV': JSON.stringify(process.env.ENV)
            }
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource !== undefined &&
                resource.indexOf('node_modules') !== -1 &&
                resource.indexOf('node_modules\\tonnguyen-agm-core') === -1
            )
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        ),
        new CopyWebpackPlugin([
            { from: helpers.root('src/' + moduleName + '/components/field-editor-google-map/legacy/fieldEditorGoogleMap.js'), to: helpers.root('dist') },
            { from: helpers.root('src/' + moduleName + '/components/field-editor-google-map-setting/legacy/fieldEditorGoogleMapSetting.js'), to: helpers.root('dist') },
            { from: helpers.root('src/' + moduleName + '/components/field-editor-google-map/legacy/fieldEditorGoogleMap.html'), to: helpers.root('dist') },
            { from: helpers.root('src/' + moduleName + '/components/field-editor-google-map-setting/legacy/fieldEditorGoogleMapSetting.html'), to: helpers.root('dist') },
        ]),
        // new BundleAnalyzerPlugin(),
    ],
    resolve: {
        modules: [
            helpers.root("node_modules"),
            helpers.root("src/" + moduleName)
        ],
        extensions: ['.ts', '.js', '.json']
    }
};