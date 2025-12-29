const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[contenthash].${ext}`)

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ]

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: isDev ? 'development' : 'production',
  entry: ['core-js/stable', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
          }
        : false,
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ['import'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}
