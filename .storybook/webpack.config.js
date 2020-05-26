const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = ({ config }, env) => {
  // console.log(config);
  config.resolve.extensions.push(
    ".ts",
    ".tsx",
    ".vue",
    ".css",
    ".less",
    ".scss",
    ".sass",
    ".html"
  );

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      }
    ]
  });
  config.module.rules.push({
    test: /\.less$/,
    loaders: ["style-loader", "css-loader", "less-loader"]
  });
  config.module.rules.push({
    test: /\.styl$/,
    loader: "style-loader!css-loader!stylus-loader"
  });
  config.module.rules.push({
    test: /\.sass$/,
    loader: "style-loader!css-loader!sass-loader"
  });
  config.module.rules.push({
    test: /\.scss$/,
    loader: "style-loader!css-loader!sass-loader"
  });

  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  return config;
};
