import React from 'react/addons';
import assert from 'assert';
import SignupPage from '../../app/components/SignupPage.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} = React.addons.TestUtils;

describe('用户注册页面 SignupPage', () => {
  // 渲染被调用的模块
  const component = renderIntoDocument(
    <SignupPage />
  );
  // 通过Class获取组件
  const signupPage = findRenderedDOMComponentWithClass(component, 'signupPage');

  it('React渲染页面成功', () => {
    // 获取textContent内容，简单判断是否成功
    assert.equal(signupPage.getDOMNode().textContent, '获取验证码创建账号');
  });

  describe('手机号输入框 组件', ()=> {
    // 获取手机号输入框DOM
    const mobileNumber = React.findDOMNode(component.refs.mobileNumber);

    it('mobileNumber 组件存在', ()=> {
      // 检测是否为text属性
      assert.equal(mobileNumber.getAttribute('type'), 'text');
      // 检测placeholder是否为 手机号
      assert.equal(mobileNumber.getAttribute('placeholder'), '手机号');
    });

    it('输入号码后，会更新state', ()=> {
      // 获得初始state
      const initialPhone = component.state.phone;
      // 初始号码为空
      assert.equal(initialPhone, '');
      // 模拟进入控件
      Simulate.click(mobileNumber);
      // 修改输入框内容
      mobileNumber.value = '13552987637';
      Simulate.change(mobileNumber);
      const changedPhone = component.state.phone;
      // 测试输入前后的state不一样
      assert.notEqual(changedPhone, initialPhone);
    });
  });

  describe('获取验证码 组件', ()=> {
    it('getVerificationCode 组件存在', ()=> {
      const getVerificationCode = React.findDOMNode(component.refs.getVerificationCode);
      assert.equal(getVerificationCode.textContent, '获取验证码');
    });
  }); 
});