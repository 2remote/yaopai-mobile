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

  describe('测试 手机号 输入框 组件', ()=> {
    it('mobileNumber 组件存在', ()=> {
      // 获取手机号输入框DOM
      var mobileNumber = React.findDOMNode(component.refs.mobileNumber);
      // 检测是否为text属性
      assert.equal(mobileNumber.getAttribute('type'), 'text');
      // 检测placeholder是否为 手机号
      assert.equal(mobileNumber.getAttribute('placeholder'), '手机号');
    });
  });

  describe('测试 获取验证码 组件', ()=> {
    it('getVerificationCode 组件存在', ()=> {
      var getVerificationCode = React.findDOMNode(component.refs.getVerificationCode);
      assert.equal(getVerificationCode.textContent, '获取验证码');
    });
  }); 
});