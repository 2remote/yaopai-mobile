import React from 'react/addons';
import assert from 'assert';
import SignupPage from '../../app/components/SignupPage.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} = React.addons.TestUtils;

describe('用户注册页面 SignupPage', () => {
  // 渲染被调用的模块
  const component = renderIntoDocument(
    <SignupPage />
  );
  // 通过Class获取组件
  const signupPage = findRenderedDOMComponentWithClass(component, 'signupPage');

  it('检测页面是否渲染成功', () => {
    // 获取textContent内容，简单判断是否成功
    assert.equal(signupPage.getDOMNode().textContent, '获取验证码创建账号');
  });
});