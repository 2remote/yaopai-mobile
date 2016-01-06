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

  const apiFlag = false;
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


    // register目前没有好方法测试

    data = {
      rawPassword: 'woshifox',
      newPassword: 'woshifox2013'
    };
    apiOk(API.USER.modify_password, data, 'API.USER.modify_password 用户修改密码');
    // 修改密码后，需要密码，保证下次运行正确
    data = {
      rawPassword: 'woshifox2013',
      newPassword: 'woshifox'
    };
    apiOk(API.USER.modify_password, data, 'API.USER.modify_password 恢复密码');

    //verifyTelResetPassWord目前不使用，跳过。

    //receiveTelResetPassWord需要结合手机验证吗，目前没有好方法测试

    data = {};
    apiOk(API.USER.logout, data, 'API.USER.logout 登出用户');
  }
});
