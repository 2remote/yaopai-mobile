import Reflux from 'reflux';
import {
  storeIsDefined, 
  storeHasData, 
  storeHasMethod, 
  storeCheckCommonUsage,
  storeHasDefaultValue
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import UserStore from '../../app/stores/UserStore';

describe('User Store Test', () => {
  const successfulRes = {
    Success: true,
    Result: [1, 2, 3]
  };

  const errorMsg = 'error message';

  const failedRes = {
    Success: false,
    ErrorMsg: errorMsg
  };

  beforeEach(() => {
    UserStore.data.hintMessage = '';
    UserStore.data.flag = '';
  });

  it('has store', () => {
    storeIsDefined(UserStore);
    storeHasData(UserStore);
  });

  describe('has methods', () => {
    const methods = [
      'getTokenToLogin',
      'onLoginSuccess',
      'onLoginFailed',
      'onCurrentUser',
      'onGetCurrentUser',
      'onGetCurrentUserFailed',
      'onLoginWithTokenSuccess',
      'onLoginWithTokenFailed',
      'onRegisterSuccess',
      'onRegisterFailed',
      'onLogoutSuccess',
      'onModifyPasswordSuccess',
      'setCurrentUser',
      'onTelResetPassWordSuccess',
      'onTelResetPassWordFailed',
      'onreceiveTelResetPassWordSuccess',
      'onreceiveTelResetPassWordFailed'
    ];
    methods.forEach((method) => {
      storeHasMethod(UserStore, method);
    })
  });

  describe('onreceiveTelResetPassWordFailed', () => {

    storeHasDefaultValue(UserStore);

    it('has right value after run', () => {
      UserStore.onreceiveTelResetPassWordFailed();
      expect(UserStore.data.hintMessage).to.equal('网络出错啦！');
      expect(UserStore.data.flag).to.equal('resetPassword');  
    });
  });

  storeCheckCommonUsage(UserStore, 'onreceiveTelResetPassWordSuccess', 'resetPassword');

  describe('onTelResetPassWordFailed', () => {
    storeHasDefaultValue(UserStore);
    UserStore.onTelResetPassWordFailed();
    expect(UserStore.data.hintMessage).to.equal('网络出错啦！');
    expect(UserStore.data.flag).to.equal('check');
  });

});