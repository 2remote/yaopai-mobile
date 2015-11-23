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
    let loginForm = scryRenderedDOMComponentsWithClass(component, 'loginForm');
    expect(scryRenderedDOMComponentsWithClass(component, 'loginForm').length).to.above(0);
  });
});