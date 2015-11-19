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
  // sinon绑定 showMessage
  let spyShowMessage = sinon.spy(SignupPage.prototype.__reactAutoBindMap, 'showMessage');
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

  describe('手机号输入框 组件', () => {
    // 获取手机号输入框DOM
    const mobileNumber = React.findDOMNode(component.refs.mobileNumber);

    it('mobileNumber 组件存在', () => {
      // 检测是否为text属性
      assert.equal(mobileNumber.getAttribute('type'), 'text');
      // 检测placeholder是否为 手机号
      assert.equal(mobileNumber.getAttribute('placeholder'), '手机号');
    });

    it('输入号码后，会更新state', () => {
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

  describe('获取验证码 组件', () => {
    it('getVerificationCode 组件存在', () => {
      const getVerificationCode = React.findDOMNode(component.refs.getVerificationCode);
      assert.equal(getVerificationCode.textContent, '获取验证码');
    });

    it('点击后激活 _handleGetCode', () => {
      let spyGetCode = sinon.spy(SignupPage.prototype.__reactAutoBindMap, "_handleGetCode");
      const component = renderIntoDocument(
        <SignupPage />
      );

      // 模拟点击
      const getVerificationCode = React.findDOMNode(component.refs.getVerificationCode);
      Simulate.click(getVerificationCode);
      // 验证
      assert.equal(spyGetCode.called, true);
    });

    describe('_handleGetCode', () => {
      it('等待验证码时，直接返回', () => {
        component.state.codeLeft = 8;
        // 马上取值，强制state更新
        const forceState = component.state.codeLeft;
        const re = component._handleGetCode();
        // 直接返回的函数是undefined
        assert.equal(typeof re, 'undefined');
      });

      it('初始化时，进入函数，判断手机', () => {
        component.state.codeLeft = 0;
        // 马上取值，强制state更新
        const forceState = component.state.codeLeft;
        const re = component._handleGetCode();
        // 直接返回的函数是undefined
        assert.equal(re, false);
      });

      it('手机号符合/不符合', () => {
        // 初始化spy
        spyShowMessage.reset();
        const component = renderIntoDocument(<SignupPage />);
        const validatedMobile = '13552987637';
        component.state.phone = validatedMobile;
        const forceState = component.state.phone;
        const re = component._handleGetCode();
        // 进入验证环节
        assert.equal(re, false);
        // 手机号符合，不会调用showMessage
        assert.equal(spyShowMessage.called, false);

        const inValidatedMobile = '1355298763777';
        component.state.phone = inValidatedMobile;
        const forceState2 = component.state.phone;
        const reInvalidate = component._handleGetCode();
        // 进入验证环节
        assert.equal(reInvalidate, false);
        // 手机号不符合，会调用showMessage
        assert.equal(spyShowMessage.called, true);
        // 以正确提示信息调用
        assert.equal(spyShowMessage.withArgs('请输入正确的手机号码').calledOnce, true);
      });
    });
  });

  describe('密码输入框 组件', () => {
    it('passWord 组件存在', () => {
      const passWord = React.findDOMNode(component.refs.passWord);
      assert.equal(passWord.placeholder, '输入密码');
    });

    it('_handlePassword1Change', () => {
      // 密码修改前
      let password1 = component.state.password1;
      assert.equal(password1, '');
      // 修改密码
      const passWord = React.findDOMNode(component.refs.passWord);
      const testPass = "testing password";
      passWord.value = testPass;
      Simulate.change(passWord);
      const forceState = component.state.password1;
      // 密码修改后
      assert.equal(component.state.password1, testPass);
    });
  });

  describe('验证码输入框 组件', () => {
    const verificationCode = React.findDOMNode(component.refs.verificationCode);
    it('verificationCode 组件存在', () => {
      assert.equal(verificationCode.placeholder, '验证码')
    });

    it('_handleCodeChange', () => {
      // 修改注册码前
      let vCode = component.state.code;
      assert.equal(vCode, '');
      // 修改注册码
      const testCode = 'asldfjoewf';
      verificationCode.value = testCode;
      Simulate.change(verificationCode);
      const forceState = component.state.code;
      // 修改注册码后
      assert.equal(component.state.code, testCode);
    });
  });

  describe('创建账号 组件', () => {
    it('signupButton 组件存在', () => {
      const signupButton = React.findDOMNode(component.refs.signupButton);
      assert.equal(signupButton.textContent, '创建账号');
    });

    describe('_handleRegister', () => {
      // 初始化spy
      const component = renderIntoDocument(<SignupPage />);

      // spyShowMessage.withArgs('请输入正确的手机号码');
      it('手机号 验证', () => {
        // 错误手机号码
        component.state.phone = '12345678';
        let forceState = component.state.phone;
        // 运行测试
        spyShowMessage.reset();
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs('请输入正确的手机号码').calledOnce, true);

        // 正确手机号
        component.state.phone = '13552987637';
        forceState = component.state.phone;
        // 运行测试
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs('请输入正确的手机号码').calledOnce, true);

      });

      it('密码不为空 验证', () => {
        // spy参数
        const spyArg = '请输入密码';
        // 空密码
        component.state.password1 = '';
        let forceState = component.state.password1;
        // 运行测试
        spyShowMessage.reset();
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledOnce, true);

        // 有内容的密码
        component.state.password1 = 'asdfwfd';
        forceState = component.state.password1;
        // 运行测试
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledOnce, true);
      });


      it('密码长度应在6-18之间', () => {
        const spyArg = '密码长度应在6-18之间';

        // 1位密码
        component.state.password1 = '1';
        let forceState = component.state.password1;
        spyShowMessage.reset();
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledOnce, true);

        // 4位密码
        component.state.password1 = '1234';
        forceState = component.state.password1;
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledTwice, true);

        // 8位密码
        component.state.password1 = '12345678';
        forceState = component.state.password1;
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledTwice, true);

        // 19位密码
        component.state.password1 = '1234567890123456789';
        forceState = component.state.password1;
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledThrice, true);
      });

      it('验证码不为空', () => {
        const spyArg = '请输入验证码';
        // 空验证码
        component.state.code = '';
        let forceState = component.state.code;
        spyShowMessage.reset();
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledOnce, true);

        // 有效验证码
        component.state.code = '1234';
        forceState = component.state.code;
        component._handleRegister();

        assert.equal(spyShowMessage.withArgs(spyArg).calledOnce, true);
      });
    });
  });
});
