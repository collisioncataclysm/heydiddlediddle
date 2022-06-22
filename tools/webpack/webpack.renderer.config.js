const rules = require('./common/webpack.rules');
const plugins = require('./common/webpack.plugins');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

plugins.push(
  new MonacoWebpackPlugin({
    languages: ['typescript', 'javascript', 'html', 'css'],
  }),
);
plugins.push(
  new MiniCssExtractPlugin({
    filename: './css/[name].css',
  }),
);

// Handling style files
rules.push({
  test: /\.css$/,
  use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.less$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
    },
    {
      // Used to load the url loaders present in blueprintjs (/resources/icons)
      loader: 'resolve-url-loader',
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          // Used to evaluate css function (https://github.com/palantir/blueprint/issues/5011).
          math: 'always',
        },
      },
    },
  ],
});

// Handling assets
rules.push({
  test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
  type: 'asset/resource',
});

module.exports = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js',
    },
  },
  devtool: 'source-map',
};
