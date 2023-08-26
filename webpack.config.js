// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//   mode:"development",
//   entry: './src/index.ts',
//   // devtool: 'inline-source-map',
//   module: {
    
//     rules: [
//       {
//         test: /\.(ts|js)x?$/,
       
//         use: ['babel-loader','@linaria/webpack5-loader'],
//         exclude: /node_modules/,
//       },
//     //   {
//     //     test: /\.(tsx|ts)$/,
//     //     exclude:  /node_modules/,
//     //     use: '@linaria/webpack5-loader'
//     // },
//       {
//         test: /\.scss$/i,
//         use: [
//           { 
//             options:{
//                 hmr:process.env.NODE_ENV==='development'
//             }
//         },
//           // Creates `style` nodes from JS strings
//           "style-loader",
//           // Translates CSS into CommonJS
//           "css-loader",
//           // Compiles Sass to CSS
//           "sass-loader",
//         ]
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js','.scss',
//     '.css',],
//   },
//   devServer: {
//     static: path.resolve(__dirname, './src'),
//     port: 3000, // Choose your preferred port number
//   },
//   output: {
//     filename: '[name].main.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   plugins:[
//     new HtmlWebpackPlugin({
//       template: "./dist/index.html"
//     }),
//     new MiniCssExtractPlugin()
    
//   ],
// };

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname,'./website/root.tsx'),
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?|ts)$/,
        use:  {
            loader:'babel-loader',
            options: {
                presets: ["@babel/preset-env","@babel/preset-react"]
            }},
            include:path.resolve(__dirname,"src","website"),
        exclude: /node_modules/,
        
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(tsx?|jsx?|ts)$/, // types of file
        exclude:/node_modules/,
        
        use: [
          {loader:'babel-loader'},
          {loader:'@linaria/webpack5-loader'},
        ] // Linaria requires Babel transformation
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', 
          'css-loader',
         
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require.resolve("sass"),
            },
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
           'style-loader', 
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.web.js',
    '.js',
    '.jsx',
    '.scss',
    '.css',
    '.json',
    'node',
    '.ts',
    '.tsx',
    '.d.ts',],
    alias:{
        lodash: 'lodash-es'
    }
  },
//   devServer: {
//     port: 3000,
//   },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    
  },

  plugins: [
    
      //   ["optimize-clsx", { "functionNames": ["getCellClassname"] }]
    new HtmlWebpackPlugin({
        template:"./public/index.html"
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin()
  ],
};
