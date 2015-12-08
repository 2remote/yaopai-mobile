import React from 'react/addons';
import { expect } from 'chai';
import LoginPage from '../../../app/components/LoginPage/index.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;

describe('登陆页 loginPage', () => {
  const component = renderIntoDocument(
    <LoginPage />
  );
  it('登陆logo是否存在', () => {
    let yaopaiLogo = React.findDOMNode(component.refs.yaopaiLogo);
    // 是否匹配图片地址
    expect(yaopaiLogo.src).to.have.string('imgs/loginPage/yaopai-logo.png');
  });

  it ('登陆表单组件是否存在', () => {
    // 是否存在loginForm类的组件
    let loginForm = scryRenderedDOMComponentsWithClass(component, 'loginForm');
    expect(loginForm.length).to.above(0);
  });

  it ('弹出层组件是否存在', () => {
    // 获取弹出层组件
    let toaster = component.refs.toast;
    expect(toaster).to.exist;
  });

  it ('link跳转组件是否正确', () => {
    // 获取Link组件
    let linkSignup = component.refs.link;
    expect(linkSignup.props.to).to.equal('/signupPage');
    // 获取Link的子节点span
    let childSpan = component.refs.signupButton.getDOMNode();
    expect(childSpan.textContent).to.equal('新建帐号');
  });

  it ('内容OR的节点是否正确', () => {
    // 获取节点
    let splitText = findRenderedDOMComponentWithClass(component, 'splitText').getDOMNode();
    expect(splitText.textContent).to.exist;
  });

  it ('ActionBar组件是否存在', () => {
    // 获取ActionBat组件
    let actionBar = component.refs.actionBar;
    expect(actionBar).to.exist;
  });
});