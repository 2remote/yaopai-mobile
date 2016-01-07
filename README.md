# yaopai-mobile
web app for YAOPAI

CircleCI
[![Circle CI](https://circleci.com/gh/2remote/yaopai-mobile/tree/master.svg?style=svg&circle-token=1cc3f1e118023c56b38a5ab98154fcd893baaf06)](https://circleci.com/gh/2remote/yaopai-mobile/tree/master)

## 分支说明

- master 为部署分支，所有 master 分支的内容都应当是可部署的，只允许从 dev 分支 pull request 到 master。
- dev 为默认分支，所有 feature、bug 分支都从 dev 分支创建，并最终 pull request 到 dev。
- master、dev 是保护分支，不能强制 push，只能用 pull request 的方式合并，且必须同时满足以下两个条件
  - 至少一个管理员审核
  - ci 显示为 pass
