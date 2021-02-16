const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	configureWebpack: {
		plugins: [
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
			}),
		],
	},
	transpileDependencies: ['vuetify'],
	// chainWebpack: config => {
	// 	const svgRule = config.module.rule('svg');

	// 	svgRule.uses.clear();

	// 	svgRule
	// 		.use('babel-loader')
	// 		.loader('babel-loader')
	// 		.end()
	// 		.use('vue-svg-loader')
	// 		.loader('vue-svg-loader');
	// },
};
