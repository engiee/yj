const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

//传家一个插件的示例对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件
    filename: 'index.html'         //生成在内存中的首页的名称
})

//向外暴露一个打包的配置对象
module.exports = {
    mode: 'development',  //development 或 production
    plugins:[
        htmlPlugin
    ],
    module:{   // 所有的第三方模块的配置规则
        rules:[
            {test:/\.js|.jsx$/,use:'babel-loader',exclude:/node_modules/},
            //可以在css-loade之后 通过 ? 追加参数
            // 其中，有个固定的参数，叫做 modules，表示为普通的css样式表，启用模块化
            {test:/\.css$/,use:['style-loader','css-loader']},  //配置生成的标识符
            {test:/\.scss$/,use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','sass-loader']}, 
            {test:/\.ttf|.woff|.woff2|eot|svg$/,use:'url-loader'},
        ]
    },
    resolve:{
        extensions:['.js','.jsx','json'],  //表示 这几个文件的后缀名，可以省略 ，注意顺序
        alias:{
            '@': path.join(__dirname,'./src')  //@表示项目根目录下到src路径
        }
    }
}
