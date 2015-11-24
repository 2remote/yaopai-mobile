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

  describe('密码输入框组件', () => {
    // 获取密码框虚拟DOM
    let passWord = component.refs.passWord;
    it ('密码框DOM存在', () => {
      expect(passWord.getDOMNode().placeholder).to.equal('密码');
    });

    it ('输入密码后，改变state', () => {
      let initNumber = component.state.password;
      // 验证密码的初始值是不是为空
      expect(initNumber).to.be.empty;
      // 模拟输入事件
      Simulate.change(passWord.getDOMNode(), {target: {value: '123456'}});
      // 验证密码是否改变
      expect(component.state.password).to.equal('123456');
    });
  });

  describe('忘记密码组件', () => {
    // 获取忘记密码虚拟DOM
    let linkFind = component.refs.linkFind;
    it ('验证连接是否正确', () => {
      expect(linkFind.props.to).to.equal('/find_my_pass_page1');
    });

    it ('忘记密码是否存在', () => {
      // 获取内容DOM节点
      let textContext = component.refs.findMyPassButton.getDOMNode();
      expect(textContext.value).to.equal('忘记密码');
    });
  });

  describe('登陆按钮组件存在', () => {
    // 获取登陆按钮虚拟DOM
    let loginButton = component.refs.loginButton;
    it ('登陆内容是否存在', () => {
      expect(loginButton.getDOMNode().textContent).to.exist;
    });
  });
});