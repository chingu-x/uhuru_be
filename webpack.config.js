const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports ={
  entry: './src/index.js',
  target:'node',
  externals: [nodeExternals()], 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '.mjs','.js', '.(graphql|gql)'],
    modules: [
        'src',
    ]
  },
  module:{
    rules:[
      {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
      },
    ]
  },
}
