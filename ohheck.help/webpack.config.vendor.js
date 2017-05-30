const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
    return [{
        stats: { modules: false },
        resolve: {
            extensions: [ '.js' ]
        },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                'whatwg-fetch',
                'react',
                'react-dom',
                'react-router-dom',
                'react-markdown'
            ],
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'js'),
            publicPath: '/js/',
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'js', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    }];
};