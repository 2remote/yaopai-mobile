import React from 'react/addons';
import { expect } from 'chai';
import WeichatLogin from '../../../app/components/LoginPage/WechatLogin.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;

describe('登陆页 微信登陆组件', () => {
  const component = renderIntoDocument(
    <WeichatLogin />
  );
  it ('微信登陆组件是否存在', () => {
    // 获取虚拟微信组件DOM
    let weichatLogin = findRenderedDOMComponentWithClass(component, 'weichatLogin');
    expect(weichatLogin.getDOMNode().textContent).to.equal('微信帐号登录');
  });
  it ('微信图片是否存在', () => {
    // 获取图片虚拟DOM
    let wechatLogo = component.refs.wechatLogo;
    expect(wechatLogo.getDOMNode().src).to.have.string('imgs/common/wechat-logo.png');
  });
  it ('_weChatLogin', () => {
    const component = renderIntoDocument(
      <WeichatLogin />
    );
    // 模拟微信点击阻塞，望松涛help
    // let spyWeChatLogin = sinon.spy(WeichatLogin.prototype.__reactAutoBindMap,_weChatLogin);
    // let weichatLogin = findRenderedDOMComponentWithClass(component, 'weichatLogin');
    // // 模拟微信点击登陆
    // ///Simulate.click(weichatLogin.getDOMNode());
    // component._weChatLogin();
    // expect(spyWeChatLogin.callCount).to.equal(1);
  });
});