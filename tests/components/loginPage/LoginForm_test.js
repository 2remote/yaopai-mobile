import React from 'react/addons';
import { expect } from 'chai';
import LoginForm from '../../../app/components/LoginPage/LoginForm.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;

describe('登陆页 LoginForm组件', () => {
  // 获取loginForm组件
  const component = renderIntoDocument(
    <LoginForm />
  );
  it ('form表单存在', () => {
    // 获取form表单
    let loginForm = component.refs.loginForm;
    expect(loginForm).to.exist;
  });

  describe('手机输入框组件', () => {
    it ('手机号dom存在', () => {
      // 获取手机号虚拟dom
      let mobileNumber = component.refs.mobileNumber;
      expect(mobileNumber.getDOMNode().placeholder).to.equal('手机号');
    });
  });
});