# LoginPage文档

### 目的
- 快速启动：推动项目落地，搭建协作环境，拟定协作文档。
- 团队磨合：熟悉基本Git，React，钉钉等流程，引发必要微信语音讨论。
- 时间预估：根据登陆页制作时间，为评估后续页面耗时提供参考。

### 内容
- 登陆页面测试稿
- [组件划分样图](./LoginPage.png)

### 逻辑

#### TextInput.onBlur()
     》 检查用户名有内容
          是：TextInput.state.hint = true
          否：
               》 TextInput.state.hint = false
               》  HintBox.update("用户名不能为空！")
     》 检查TextInput的用户存在
          是：TextInput.state.hint = true
          否：
               》TextInput.state.hint = false
               》HintBox.update("用户不存在，请注册")
               》return

#### PasswordInput.onBlur()
       》 检查密码有内容
          是：TextInput.state.hint = true
          否：
               》 TextInput.state.hint = false
               》  HintBox.update("密码不能为空！")

#### LoginButton.onClick()
     》 检查用户和密码都有填写
          是：next
          否：
               》未添Input的TextInput.state.hint = false
               》 HintBox.update("用户或密码没有填写完整，请重填")
               》 return
     》 服务器检查密码
          是：next
          否：
               》 HintBox.update("用户或密码不正确，请重填")
               》return；