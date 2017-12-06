import * as path from 'path';
import * as webpack from 'webpack';

const entry = path.resolve(__dirname, 'src/browser-detect.ts');
const moduleName = 'browser-detect';

export default {
    entry: {
        [moduleName]: entry,
        [`${moduleName}.min`]: entry
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    node: false,
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};