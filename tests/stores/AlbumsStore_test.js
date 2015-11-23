import Reflux from 'reflux';
import {
  storeIsDefined, storeHasData, storeHasMethod
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import AlbumsStore from '../../app/stores/AlbumsStore';

describe('Albums Store Test', () => {
  const successfulRes = {
    Success: true
  };

  const errorMsg = 'error message';

  const failedRes = {
    Success: false,
    ErrorMsg: errorMsg
  };

  beforeEach(() => {
    AlbumsStore.data.hintMessage = '';
    AlbumsStore.data.flag = '';
  });

  it('has store', () => {
    storeIsDefined(AlbumsStore);
    storeHasData(AlbumsStore);
  });

  it('has methods', () => {
    const methods = [
      'onFailed',
      'onAddsuccess',
      'onGetSuccess',
      'onUpdateSuccess',
      'onDeleteSuccess',
      'onSearchSuccess',
      'onGetMyAlbumsSuccess',
      'onGetCategoiesSuccess',
      'onSaleSuccess',
      'offSaleSuccess',
      'onRecommendListSuccess'
    ];
    methods.forEach((method) => {
      storeHasMethod(AlbumsStore, method);
    })
  });

  it('works on failed', () => {
    AlbumsStore.onFailed();
    expect(AlbumsStore.data.hintMessage).to.equal('网络错误');
    expect(AlbumsStore.data.flag).to.equal('failed');
  });

  it('works on add success', () => {
    AlbumsStore.onAddSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('add');

    AlbumsStore.onAddSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('add');
  });

  it('works on get success', () => {
    AlbumsStore.onGetSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.workData).to.equal(successfulRes);
    expect(AlbumsStore.data.flag).to.equal('get');

    AlbumsStore.onGetSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.workData).is.empty;
    expect(AlbumsStore.data.flag).to.equal('get');
  });

  it('works on update success', () => {
    AlbumsStore.onUpdateSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('update');

    AlbumsStore.onUpdateSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('update');
  });

  it('works on delete success', ()=> {
    AlbumsStore.onDeleteSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('delete');

    AlbumsStore.onDeleteSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('delete');
  });
});