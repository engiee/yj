console.log('sdsd');

//1.导入包
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from '@/components/Hello' 
import CmtList from '@/components/CmtList' 
import '@/components/class'
//2.创建虚拟dom元素
//虚拟dom元素：用js对象的形式，来表示DOM 和 DOM 之间的嵌套关系

//const myDiv = React.createELement("div",{id:"myDiv"},'这是一个div元素')

//html是最优秀的标记语言
//注意：在js文件中，默认不能写这种类似于html的语法，叫做jsx语法：符合XLML规范的js
//注意：jsx语法的本质：还是在运行的时候，被转换成了react.createElement形式来运行的


let user = {
    name:"wangzhen",
    age:32,
    gender:"男"
}

//创建组件的方式（第一种）
// function Hello(props) {
//    console.log(props)
//    return <div>Hello组件======{props.name}</div> //如果返回null 是一个空组件，但是必须返回一个合法的JSX 虚拟dom树
//    //结论：不管是react/vue，组件的props永远都是只读的，不能被重新赋值
// }

// class关键字创建的组件，有自己的私有数据 和 生命周期函数
class Movie extends React.Component {
    constructor(){
        //由于Movie组件，继承来React.Component 这个父类， 所以，自定义的构造器种，必须使用super()
        super()
        //只有调用了super方法，才能使用this关键字
        this.state = {
            msg:"大家好，我是class创建的Movie组件"
        } //这个this.state = {} 就相当于Vue中的data(){return{}}
    }
    render(){ 
        this.state.msg = 'msg信息被我修改了'
        return <div>
                  <h4>class定义的组件----{this.props.name}</h4>
                  <h5>{this.state.msg}</h5>
                </div>
    }
}

const myDiv = <div id="myDiv">
    <Movie {...user}></Movie>
    <CmtList></CmtList>
</div>


ReactDOM.render(myDiv,document.getElementById("app"))