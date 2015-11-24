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
    // 获取手机号虚拟dom
    let mobileNumber = component.refs.mobileNumber;
    it ('手机号dom存在', () => {
      expect(mobileNumber.getDOMNode().placeholder).to.equal('手机号');
    });

    it ('输入号码后，改变state', () => {
      let initNumber = component.state.userName;
      // 验证手机号初始值是不是为空
      expect(initNumber).to.be.empty;
      // 模拟输入事件
      Simulate.change(mobileNumber.getDOMNode(), {target: {value: '18883283605'}});
      // 验证手机号是否改变
      expect(component.state.userName).to.equal('18883283605');
    });
  });
});