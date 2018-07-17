const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

//传家一个插件的示例对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件
    filename: 'index.html'         //生成在内存中的首页的名称
})

//向外暴露一个打包的配置对象
module.exports = {
    mode: 'development',
    plugins:[
        htmlPlugin
    ],
    module:{   // 所有的第三方模块的配置规则
        rules:[
            {test:/\.js|.jsx$/,use:'babel-loader',exclude:/node_modules/}
        ]
    },
    resolve:{
        extensions:['.js','.jsx','json'],  //表示 这几个文件的后缀名，可以省略 ，注意顺序
        alias:{
            '@': path.join(__dirname,'./src')  //@表示项目根目录下到src路径
        }
    }
}