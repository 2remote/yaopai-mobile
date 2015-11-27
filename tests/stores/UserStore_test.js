import Reflux from 'reflux';
import {
  storeIsDefined,
  storeHasData,
  storeHasMethod,
  storeCheckCommonUsage,
  storeHasDefaultValue,
  makeCheckStoreData,
  makeStoreHasMethod
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

  const checkUserStoreData = makeCheckStoreData(UserStore);
  const userStoreHasMethod = makeStoreHasMethod(UserStore);

  beforeEach(() => {
    UserStore.data.hintMessage = '';
    UserStore.data.flag = '';
    UserStore.data = {
      userId: '',
      userName: '',
      loginToken: '', //用户选择rememberme的时候返回
      userType: '',
      userState: '',
      isLogin: false,
      hintMessage: '',
      flag: '',
      loginDate: '',
    };
  });

  it('has store', () => {
    storeIsDefined(UserStore);
    storeHasData(UserStore);
  });



  it('store has methods', () => {
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
      userStoreHasMethod(method);
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

  storeCheckCommonUsage(UserStore, 'onTelResetPassWordSuccess', 'check');

  describe('setCurrentUser', () => {
    it('set default vars when data is false', () => {

      const data = false;
      storeHasData(UserStore, 'userId');

      expect(!data).to.equal(true);
      UserStore.setCurrentUser(data);

      const datas = {
        userId: '',
        userName: '',
        local: true,
        isLogin: false,
        userType: '',
        avatar: '',
        loginDate: ''
      };
      
      const keys = Object.keys(datas);
      keys.map(function (key) {
        checkUserStoreData(key, datas[key]);
      })
    });

    describe('set data when data is true', () => {
      let data = {
        Id: '12',
        Name: 'fox',
        Type: 'user',
        Local: 'beijing'
      };

      it('will set normal props', () => {
        expect(!data).to.equal(false);
        UserStore.setCurrentUser(data);
        checkUserStoreData('userId', '12');
        checkUserStoreData('userName', 'fox');
        checkUserStoreData('userType', 'user');
        checkUserStoreData('local', 'beijing');
        checkUserStoreData('isLogin', true);
        storeHasData(UserStore, 'loginDate');
      });

      it('will give default avatar when does not return Avatar ', () => {
        expect(!data).to.equal(false);
        UserStore.setCurrentUser(data);

        expect(UserStore.data.avatar).to.match(/_randomAvatar/);
      });

      it('will load avatar when has Avatar', () => {
        data.Avatar = 'fox.png';
        expect(!data).to.equal(false);
        UserStore.setCurrentUser(data);

        checkUserStoreData('avatar', 'fox.png');
      });

    });
  });
});