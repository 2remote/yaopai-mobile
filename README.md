# yaopai-mobile
web app for YAOPAI

CircleCI
[![Circle CI](https://circleci.com/gh/2remote/yaopai-mobile/tree/master.svg?style=svg&circle-token=1cc3f1e118023c56b38a5ab98154fcd893baaf06)](https://circleci.com/gh/2remote/yaopai-mobile/tree/master)

[![Throughput Graph](https://graphs.waffle.io/2remote/yaopai-mobile/throughput.svg)](https://waffle.io/2remote/yaopai-mobile/metrics)

## 分支说明

- master 为部署分支，所有 master 分支的内容都应当是可部署的，只允许从 dev 分支 pull request 到 master。
- dev 为默认分支，所有 feature、bug 分支都从 dev 分支创建，并最终 pull request 到 dev。
- master、dev 是保护分支，不能强制 push，只能用 pull request 的方式合并，且必须同时满足以下两个条件
  - 至少一个管理员审核
  - ci 显示为 pass

## 开发前的准备步骤

1. 克隆项目：`git clone https://github.com/2remote/yaopai-mobile.git`
2. 安装 [Node.js](https://nodejs.org/)
3. 运行指令：`npm install`
4. 启动开发用服务器：`npm start`

由于项目使用了 [SASS](http://sass-lang.com/)，作为 CSS 预处理器，Mac 用户直接`gem install sass`即可，Win 用户应先安装 [Ruby](https://www.ruby-lang.org/en/)。


## 编码规范列表
* [React](https://github.com/vikingmute/javascript/tree/master/react)
* [ES6](https://github.com/yuche/javascript)
* [CSS / SASS](https://github.com/Zhangjd/css-style-guide)

## 编码规范总结
1. JS 里不能出现行内样式以及样式对象，除非其中的样式值需要 JS 计算才能得到。
2. 对上面的补充：样式只能写在 app/scss 目录下。假设样式写在了 app/components/某个模块/index.scss 下，那个这个index.scss享有不到 app/scss 里定义的所有东西。
3. 用 `a` 还是 `Link` ？这里约定下：组件里能用 `a` 标签的话就不用 `Link`，除非要用 `Link` 的私有属性 `activeClassName`,
4. 避免无意义的标签嵌套（这虽然是一条老生常谈的规范，但是项目里这种错误很多），同时举一反三下，避免无意义的 `react` 组件嵌套。

## 黄金定律
>不管有多少人共同参与同一项目，一定要确保每一行代码都像是同一个人编写的。
