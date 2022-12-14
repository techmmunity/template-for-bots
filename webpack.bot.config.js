const path = require('path');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isLocal = process.env.NODE_ENV !== "production";

module.exports = {
  // `mode` will be set to `production` and comes with included optimizations
  // when building to be run on AWS or similar.
  // https://webpack.js.org/configuration/mode/
  mode: isLocal ? 'development' : 'production',
  // to determine what source maps to use per dev or prod
  // https://webpack.js.org/configuration/devtool/
  devtool: isLocal ? 'source-map' : 'cheap-source-map',

	stats: 'errors-only',
  // the provided argument will be an object referencing functions as defined
  // in your `serverless.yml` .
  // https://webpack.js.org/concepts/entry-points/
  entry: './src/bot.ts',
  target: 'node',
  resolve: {
    // What file extensions we want Webpack to care about, and in what order
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    extensions: ['.js', '.ts'],
  },
  // Where the bundled files will be output. Not strictly necessary with
  // Serverless Webpack.
  // https://webpack.js.org/configuration/output/
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'bot'),
    filename: '[name].js',
  },
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			})
		]
	},
  module: {
    // Instruct Webpack to use the `ts-loader` for any TypeScript files, else it
    // won't know what to do with them.
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, '.webpack'),
            path.resolve(__dirname, '.serverless'),
          ],
        ],
        // And here we have options for ts-loader
        // https://www.npmjs.com/package/ts-loader#options
        options: {
          // Disable type checking, this will lead to improved build times
          transpileOnly: true,
          // Enable file caching, can be quite useful when running offline
          experimentalFileCaching: true,
        },
      }
    ],
  },
  // We still want type checking, just without the burden on build performance,
  // so we use a plugin to take care of it on another thread.
  // plugins: [new ForkTsCheckerWebpackPlugin()],
};
