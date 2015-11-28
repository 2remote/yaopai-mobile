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

  const currentUserKey = 'yaopai_user';

  beforeEach(() => {
    UserStore.data = {
      hintMessage: '',
      flag: '',
      userId: '',
      userName: '',
      loginToken: '', //用户选择rememberme的时候返回
      userType: '',
      userState: '',
      isLogin: false,
      loginDate: '',
      userKey: currentUserKey
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
      keys.map(function(key) {
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
        const datas = {
          userId: '12',
          userName: 'fox',
          userType: 'user',
          local: 'beijing',
          isLogin: true,
        };

        expect(!data).to.equal(false);
        UserStore.setCurrentUser(data);

        const keys = Object.keys(datas);
        keys.map((key) => {
          checkUserStoreData(key, datas[key]);
        });

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

  describe('onModifyPasswordSuccess', () => {
    it('works on successfulRes', () => {
      UserStore.onModifyPasswordSuccess(successfulRes);
      checkUserStoreData('hintMessage', '修改密码成功');
      checkUserStoreData('flag', 'modifyPassword');
    });

    it('works on failedRes', () => {
      UserStore.onModifyPasswordSuccess(failedRes);
      checkUserStoreData('hintMessage', errorMsg);
      checkUserStoreData('flag', 'modifyPassword');
    });
  });

  it('onLogoutSuccess', () => {
    // 设定虚拟LS的数据
    localStorage.setItem(currentUserKey, JSON.stringify({
      userName: 'fox name'
    }));
    expect(localStorage.getItem(currentUserKey)).to.exist;
    // 运行方法
    UserStore.onLogoutSuccess();
    checkUserStoreData('isLogin', false);
    expect(localStorage.getItem(currentUserKey)).to.not.exist;
    checkUserStoreData('flag', 'logout');
  });

  it('onRegisterFailed', () => {
    UserStore.onRegisterFailed();
    checkUserStoreData('hintMessage', '网络出错啦！');
    checkUserStoreData('flag', 'register');
  });

  storeCheckCommonUsage(UserStore, 'onRegisterSuccess', 'register');

  it('onLoginWithTokenFailed', () => {
    UserStore.onLoginWithTokenFailed();
    checkUserStoreData('hintMessage', '网络出错啦！');
    checkUserStoreData('flag', 'loginToken');
  });

  describe('onLoginWithTokenSuccess', () => {
    it('works on successfulRes', () => {
      expect(localStorage.getItem(currentUserKey)).to.not.exist;
      UserStore.onLoginWithTokenSuccess(successfulRes);
      expect(localStorage.getItem(currentUserKey)).to.exist;
    });

    it('works on failedRes', () => {
      expect(localStorage.getItem(currentUserKey)).to.exist;

      UserStore.onLoginWithTokenSuccess(failedRes);
      checkUserStoreData('isLogin', false);
      checkUserStoreData('loginToken', '')
      expect(localStorage.getItem(currentUserKey)).to.not.exist;
    });
  });

  it('onGetCurrentUserFailed', () => {
    UserStore.onGetCurrentUserFailed();
    checkUserStoreData('hintMessage', '网络出错啦！');
    checkUserStoreData('flag', 'currentUser');
  });

});