const path = require('path');

const ROOT_DIR = process.cwd()

module.exports = {
  entry: './src/index.js',
	mode: 'development',
	target: 'node',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
	resolve: {
		extensions: ['.js', '.json'],
		modules: [`${ROOT_DIR}/node_modules`],
		mainFiles: ['index', 'browser']
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			},
		]
	},
};