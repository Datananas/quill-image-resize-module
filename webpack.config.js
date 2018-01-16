const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/ImageResize.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'quill-image-resize.min.js',
    library: 'QuillImageResize',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    quill: {
      root: 'Quill',
      commonjs2: 'quill',
      commonjs: 'quill',
      amd: 'quill'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: [ {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      },
      {
        test: /\.svg$/,
        use: [ {
          loader: 'raw-loader'
        }]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        warnings: false,
        compress: {
          ie8: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          join_vars: true,
          if_return: true
        },
        output: {
          comments: false
        }
      }
    })
  ]
};
