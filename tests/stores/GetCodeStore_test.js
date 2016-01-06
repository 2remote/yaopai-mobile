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

  beforeEach(() => {
    GetCodeStore.data = {
      hintMessage: '',
      flag: '',
      left: 0,
      result: ''
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
    it('works on successfulRes', () => {
      GetCodeStore.onTelRegisterSucess(successfulRes);
      checkGetCodeStoreData('flag', 'registerCode');
      checkGetCodeStoreData('result', '验证码已发送');
    });

    it('works on failedRes', () => {
      GetCodeStore.onTelRegisterSucess(failedRes);
      checkGetCodeStoreData('flag', 'registerCode');
      checkGetCodeStoreData('result', errorMsg);
      checkGetCodeStoreData('left', 0);
    });
  });

  it('onBeginTelRegister', () => {
    GetCodeStore.onBeginTelRegister();
    expect(GetCodeStore.data.left <= 60).to.equal(true);
    expect(GetCodeStore.data.left > 0).to.equal(true);
    // 倒数函数存在，所以从60会变到59
  });

  describe('onTelRestPasswordSuccess', () => {
    it('works on successfulRes', () => {
      GetCodeStore.onTelRestPasswordSuccess(successfulRes);
      checkGetCodeStoreData('flag', 'resetCode');
      checkGetCodeStoreData('result', '验证码已发送');
    });

    it('works on failedRes', () => {
      GetCodeStore.onTelRestPasswordSuccess(failedRes);
      checkGetCodeStoreData('flag', 'resetCode');
      checkGetCodeStoreData('result', errorMsg);
      checkGetCodeStoreData('left', 0);
    });
  });

  it('onBeginTelRestPassword', () => {
    GetCodeStore.onBeginTelRestPassword();
    expect(GetCodeStore.data.left <= 60).to.equal(true);
    expect(GetCodeStore.data.left > 0).to.equal(true);
    // 倒数函数存在，所以从60会变到59
    // 针对 left <=0 目前无法测试
  });

});
