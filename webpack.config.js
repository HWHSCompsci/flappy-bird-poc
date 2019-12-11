// @ts-check
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin');

const outputPath = resolve(__dirname, 'dist')

module.exports = (env = {}) => {
  const optimization = env.production
    ? {
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: { output: { comments: false } },
            }),
          ],
        },
      }
    : undefined
  /** @type {import('webpack').Plugin[]} */
  const extraPlugins = []
  const mode = env.production ? 'production' : 'development'

  let { devtool } = env

  devtool = devtool || (env.production ? undefined : 'inline-source-map')

  return {
    entry: [resolve(__dirname, 'src/index.ts')],
    mode,
    devtool,

    devServer: {
      contentBase: outputPath,
      hot: true,
    },

    output: {
      path: outputPath,
      publicPath: '',
      filename: 'bundle.js',
    },
    ...optimization,

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
        {
          test: [/\.vert$/, /\.frag$/],
          use: 'raw-loader',
        }
      ],
    },

    resolve: {
      alias: {},
      extensions: ['.ts', '.json', '.js'],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'index.html'),
      }),
      ...extraPlugins,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        CANVAS_RENDERER: JSON.stringify(true),
        WEBGL_RENDERER: JSON.stringify(true),
      }),
      new CopyWebpackPlugin([
        { from: "assets", to: "assets" }
      ]),
      new LiveReloadPlugin({appendScriptTag: true})
    ],
  }
}