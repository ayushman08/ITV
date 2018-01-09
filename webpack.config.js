var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './build',
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './src/js/index.js',
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?presets[]=react,presets[]=es2015'],
                presets: ['es2015', 'react'],
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader!url-loader'
            }
        ]
    },
    output: {
        path: 'build',
        filename: 'js/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
