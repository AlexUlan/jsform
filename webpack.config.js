//  entry: входной фаил
// path: path.resolve(__dirname, 'public') указываем путь от текущего репозитория
//   new HTMLPlugin({template:"./src/index.html"}) формируем итоготый html
/* module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],  для подключение css стилей
      },
    ],
  } */



const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports={
    entry: './src/app.js',
    output:{
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer:{
        port:3000
    },
    plugins:[
        new HTMLPlugin({
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(),
        
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
}