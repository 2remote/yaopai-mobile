import Reflux from 'reflux';
import {
  makeStoreHasMethod,
  apiOk
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import API from '../../app/api';

import UserActions from '../../app/actions/UserActions';

const userActionsHasMethod = makeStoreHasMethod(UserActions);
describe('User Actions Test', () => {
  let data;
  beforeEach(() => {
    data ={}
  });

  it('has methods', () => {
    const methods = [
      'register',
      'login',
      'loginWithToken',
      'logout',
      'openLogin',
      'currentServerUser',
      'currentUser',
      'modifyPassword',
      'verifyTelResetPassWord',
      'receiveTelResetPassWord'
    ];
    methods.forEach((method) => {
      userActionsHasMethod(method);
    })
  });

  const apiFlag = true;
  if ( apiFlag == true ){
    data = {
      loginname: '13552987637',
      password: 'woshifox',
    };
    apiOk(API.USER.login, data, 'API.USER.login 用户登录');

    // token登录目前没有好方法测试

    // wechat登陆目前没有好方法测试

    data = {};
    apiOk(API.USER.current_user, data, 'API.USER.current_user 获得用户信息');
  }

  


});