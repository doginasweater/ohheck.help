const path = require('path');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = {
    stats: { modules: false },
    entry: {
        main: ['./src/index.tsx']
    },
    output: {
        path: `${__dirname}/wwwroot/js`,
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: 'babel-loader', options: { cacheDirectory: true } }, exclude: /node_modules/ },
            { test: /\.tsx?$/, use: 'awesome-typescript-loader?silent=true', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    devtool: 'inline-source-map',
    plugins: [new CheckerPlugin()]
};