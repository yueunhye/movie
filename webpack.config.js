
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const loader = require('sass-loader')

module.exports = {

  entry: './js/main.js',

  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true
  },
  //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  //plugins라는 구성옵션을 추가해주고 []할당
  //생성자함수처럼 실행
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
    
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin ({
      patterns: [
        { from: 'static'}
      ]
    })
  ],
  //template으로 만들어진 index파일과 main.js가 병합된 합본을 dist폴더에만들어주는역할
  devServer: {
    host: 'localhost'
  }
}
  
