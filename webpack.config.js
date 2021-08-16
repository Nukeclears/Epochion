const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/docs'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod
					}
				}
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					!prod ? "style-loader" : MiniCssExtractPlugin.loader,
                    require.resolve('css-loader'),
                    require.resolve('postcss-loader'),
                ],
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			},
			{
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                include: path.resolve(__dirname, 'src/images'),
				use: [
					prod ? 
					{
                    loader: require.resolve('webpack-image-resize-loader'),
                    options: {
                        width: 1200,
                    },
				} : false,
			].filter(Boolean),
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                include: path.resolve(__dirname, 'src/fonts'),
                type: 'asset/resource',
            },
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new HtmlWebpackPlugin({
            title: 'Svelte',
            template: path.resolve(__dirname, 'src/index.html'),
        }),
		prod ? new ImageMinimizerPlugin({
			minimizerOptions: {
			  // Lossless optimization with custom option
			  // Feel free to experiment with options for better result for you
			  plugins: [
				["gifsicle", { interlaced: true }],
				["jpegtran", { progressive: true }],
				["optipng", { optimizationLevel: 7 }],
				// Svgo configuration here https://github.com/svg/svgo#configuration
				[
				  "svgo",
				  {
					plugins: extendDefaultPlugins([
					  {
						name: "removeViewBox",
						active: false,
					  },
					  {
						name: "addAttributesToSVGElement",
						params: {
						  attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
						},
					  },
					]),
				  },
				],
			  ],
			},
		  }) : false,
	].filter(Boolean),
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
	},
};
