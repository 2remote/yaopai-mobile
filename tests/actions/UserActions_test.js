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
describe('Albums Actions Test', () => {
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
});