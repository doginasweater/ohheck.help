const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = env => {
    return [{
        stats: { modules: false },
        entry: {
            main: ['./src/index.tsx']
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        output: {
            path: `${__dirname}/wwwroot/js`,
            publicPath: '/js/',
            filename: 'bundle.js'
        },
        module: {
            rules: [
                { test: /\.ts(x?)?$/, include: /src/, use: { loader: 'babel-loader', options: { cacheDirectory: true } } },
                { test: /\.tsx?$/, include: /src/, use: 'awesome-typescript-loader?silent=true' },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                }
            ]
        },
        devtool: 'inline-source-map',
        plugins: [
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/js/vendor-manifest.json')
            })
        ]
    }];
};