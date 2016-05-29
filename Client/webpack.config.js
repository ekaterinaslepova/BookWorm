const webpack = require('webpack');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'src'),
    style: path.join(__dirname, 'style'),
    images: path.join(__dirname, 'img'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: [
        PATHS.app
    ],
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }, 
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'postcss-loader'
        },
        {
            test: /\.(jpg|png)$/,
            loader: 'file',
            include: PATHS.images
        }]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        module: {
            loaders: [{
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.style
            }]
        },
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            host: process.env.HOST,
            port: process.env.PORT
        },
        devtool: 'eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]});
} else if(TARGET === 'build') {
    module.exports = merge(common, {
        module: {
            loaders:[{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('bundle.css', {allChunks: true}),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}