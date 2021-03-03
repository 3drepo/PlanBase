const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
module.exports = {
	plugins: [
		tailwindcss('./tailwind.config.js'),
		autoprefixer({
			add: true,
			grid: false,
		}),
		//Only add purgecss in production
		process.env.NODE_ENV === 'production'
			? purgecss({
					content: ['./src/**/*.html', './src/**/*.vue', './node_modules/vuetify/**/*.js'],
					whitelist: ['v-application', 'v-application--wrap', 'spacer', 'primary', 'secondary', 'accent', 'error', 'warning', 'info', 'success'],
					whitelistPatterns: [/^v-((?!application).)*$/, /^theme--*/, /.*-transition/],
					whitelistPatternsChildren: [/^v-((?!application).)*$/, /^theme--*/],
			  })
			: '',
	],
};
