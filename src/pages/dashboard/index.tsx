import React from 'react'

import './style.scss'

export default function Dashboard(){
    return(
        <div className="dash-page">
            <h1>page dashboard</h1>
            <ol style={{marginTop:'30px'}}>
                <li>stackblitz.com 这个在线编辑器搞不定啊，不知道怎么调 TS 和 react 同时支持</li>
                <li>源代码地址： <a href="https://github.com/aqrun/react-msbjrt">https://github.com/aqrun/react-msbjrt</a></li>
            </ol>
            <ol style={{marginTop:'30px'}}>
                <li>主要功能基本已实现 </li>
                <li>异步数据使用的JS客户端代码模拟</li>
                <li>未做浏览器适配</li>
                <li>还有一个问题是 Hook组件里的回调函数没法实现state数据更新，还要再查下资料</li>
            </ol>
        </div>
    )
}