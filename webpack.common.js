const path = require('path');

const SRC_FILE = path.join(__dirname, 'client/index.jsx');
const OUT_PATH = path.join(__dirname, 'public');

module.exports = {
  entry: SRC_FILE,
  output: {
    filename: 'bundle.js',
    path: OUT_PATH
  },
  module: {
    rules: [
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};