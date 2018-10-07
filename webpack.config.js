
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

var config= {
    entry: {
        'common':['./src/page/common/index.js','webpack-dev-server/client?http://localhost8088/' ],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals:{
    	'jquery': 'window jQuery'
    },
    module: {
        loaders: [
          { test: /\.css$/, 
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader','less-loader') 
          },{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
            loader: 'url-loader?limit=100&name=resource/[name].[ext]'
          }
        ]
    },
    plugins:[
        //独立通用模块js到base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //单独打包css到文件
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};



module.exports = config