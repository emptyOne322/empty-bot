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
		alias: {
			discord: 'discord.js',
			src: `${ROOT_DIR}/src`
		},
		modules: [`${ROOT_DIR}/node_modules`],
		mainFields: ['module', 'main']
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