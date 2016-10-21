# yaopai-mobile 

[![Circle CI](https://circleci.com/gh/2remote/yaopai-mobile/tree/master.svg?style=svg&circle-token=1cc3f1e118023c56b38a5ab98154fcd893baaf06)](https://circleci.com/gh/2remote/yaopai-mobile/tree/master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/8b9037712f324170a0441faafe9f923a)](https://www.codacy.com/app/liubiantao/yaopai-mobile?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=2remote/yaopai-mobile&amp;utm_campaign=Badge_Grade) [![RamenBless](https://cdn.rawgit.com/LunaGao/BlessYourCodeTag/master/tags/ramen.svg)](https://github.com/LunaGao/BlessYourCodeTag)

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


## 编码规范列表
* [React](https://github.com/vikingmute/javascript/tree/master/react)
* [ES6](https://github.com/yuche/javascript)
* [CSS / SASS](https://github.com/Zhangjd/css-style-guide)


## 黄金定律
> 不管有多少人共同参与同一项目，一定要确保每一行代码都像是同一个人编写的。
