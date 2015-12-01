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

import GetCodeStore from '../../app/stores/GetCodeStore';

describe('Get Code Store Test', () => {
  const successfulRes = {
    Success: true,
    Result: [1, 2, 3]
  };

  const errorMsg = 'error message';

  const failedRes = {
    Success: false,
    ErrorMsg: errorMsg
  };

  const checkGetCodeStoreData = makeCheckStoreData(GetCodeStore);
  const getCodeStoreHasMethod = makeStoreHasMethod(GetCodeStore);

  const currentUserKey = 'yaopai_user';

  beforeEach(() => {
    GetCodeStore.data = {
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
    storeIsDefined(GetCodeStore);
    storeHasData(GetCodeStore);
  });

  it('store has methods', () => {
    const methods = [
      'init',
      'onBeginTelRegister',
      'onTelRegisterSucess',
      'onBeginTelRestPassword',
      'onTelRestPasswordSuccess'
    ];
    methods.forEach((method) => {
      getCodeStoreHasMethod(method);
    })
  });

  describe('onTelRegisterSucess', () => {
    GetCodeStore.onTelRegisterSucess(successfulRes);
    checkGetCodeStoreData('flag', 'registerCode');
    checkGetCodeStoreData('result', '验证码已发送');

    GetCodeStore.onTelRegisterSucess(failedRes);
    checkGetCodeStoreData('flag', 'registerCode');
    checkGetCodeStoreData('result', errorMsg);
    checkGetCodeStoreData('left', 0);
  });

});