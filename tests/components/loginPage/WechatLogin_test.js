import React from 'react/addons';
import { expect } from 'chai';
import WechatLogin from '../../../app/components/LoginPage/WechatLogin.js';

// 定义常用React测试函数
const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;

describe('登陆页 微信登陆组件', () => {
  const component = renderIntoDocument(
    <WechatLogin />
  );
  it ('微信登陆组件是否存在', () => {
    // 获取虚拟微信组件DOM
    let wechatLogin = findRenderedDOMComponentWithClass(component, 'wechatLogin');
    expect(wechatLogin.getDOMNode().textContent).to.equal('微信帐号登录');
  });
  it ('微信图片是否存在', () => {
    // 获取图片虚拟DOM
    let wechatLogo = component.refs.wechatLogo;
    expect(wechatLogo.getDOMNode().src).to.have.string('imgs/common/wechat-logo.png');
  });
  it ('_weChatLogin', () => {
    // 绑定登陆函数
    let spyWeChatLogin = sinon.spy(WechatLogin.prototype.__reactAutoBindMap, '_weChatLogin');
    const component = renderIntoDocument(
      <WechatLogin />
    );

    let wechatLogin = findRenderedDOMComponentWithClass(component, 'wechatLogin');
    // 模拟微信点击登陆
    Simulate.click(wechatLogin.getDOMNode());
    expect(spyWeChatLogin.callCount).to.equal(1);
  });
});