module.exports = {
    test: /\.jsx?$/,
    entry: "./app-client.js",
	output: {
		filename: "public/bundle.js"
	},
	query:
	{
		presets:['react']
	},
	module: {
		loaders: [
			{
				exclude: /(node_modules|app-server.js)/,
				loader: 'babel'
			}
		]
	}
};