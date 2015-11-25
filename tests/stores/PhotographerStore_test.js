import Reflux from 'reflux';
import {
  storeIsDefined, storeHasData, storeHasMethod, storeCheckCommonUsage
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import PhotographerStore from '../../app/stores/PhotographerStore';

describe('Photographer Store Test', () => {
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
    PhotographerStore.data.hintMessage = '';
    PhotographerStore.data.flag = '';
  });

  it('has store', () => {
    storeIsDefined(PhotographerStore);
    storeHasData(PhotographerStore);
  });

  it('has methods', () => {
    const methods = [
      'onGetSuccess',
      'onListSuccess',
      'onFailed',
      'onRecommendListSuccess'
    ];
    methods.forEach((method) => {
      storeHasMethod(PhotographerStore, method);
    })
  });

  storeCheckCommonUsage(PhotographerStore, 'onGetSuccess', 'get', 'photographer');
  
  storeCheckCommonUsage(PhotographerStore, 'onListSuccess', 'list');
});