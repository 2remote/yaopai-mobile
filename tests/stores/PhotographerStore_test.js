import Reflux from 'reflux';
import {
  storeIsDefined, storeHasData, storeHasMethod
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

  it('works on get success', () => {
    PhotographerStore.onGetSuccess(successfulRes);
    expect(PhotographerStore.data.hintMessage).to.equal('');
    expect(PhotographerStore.data.photographer).to.equal(successfulRes);
    expect(PhotographerStore.data.flag).to.equal('get');

    PhotographerStore.onGetSuccess(failedRes);
    expect(PhotographerStore.data.hintMessage).to.equal(errorMsg);
    expect(PhotographerStore.data.flag).to.equal('get');
  });

  it('works on list success', () => {
    PhotographerStore.onListSuccess(successfulRes);
    expect(PhotographerStore.data.hintMessage).to.equal('');
    expect(PhotographerStore.data.photographer).to.equal(successfulRes);
    expect(PhotographerStore.data.flag).to.equal('list');

    PhotographerStore.onListSuccess(failedRes);
    expect(PhotographerStore.data.hintMessage).to.equal(errorMsg);
    expect(PhotographerStore.data.flag).to.equal('list');
  });
});