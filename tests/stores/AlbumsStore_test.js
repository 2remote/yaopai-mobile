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
  let res = {};
  const errorMsg = 'error message';

  beforeEach(() => {
    AlbumsStore.data.hintMessage = '';
    AlbumsStore.data.flag = '';
    res = {
      Success: true
    }
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
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).is.empty;
    AlbumsStore.onFailed();
    expect(AlbumsStore.data.hintMessage).to.equal('网络错误');
    expect(AlbumsStore.data.flag).to.equal('failed');
  });

  it('works on add success', () => {
    AlbumsStore.onAddSuccess(res);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('add');

    res = {
      Success: false,
      ErrorMsg: errorMsg
    };

    AlbumsStore.onAddSuccess(res);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('add');
  });

  it('works on get success', () => {
    AlbumsStore.onGetSuccess(res);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.workData).to.equal(res);
    expect(AlbumsStore.data.flag).to.equal('get');

    res = {
      Success: false,
      ErrorMsg: errorMsg
    };

    AlbumsStore.onGetSuccess(res);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.workData).is.empty;
    expect(AlbumsStore.data.flag).to.equal('get');
  });

  it('works on update success', ()=> {
    AlbumsStore.onUpdateSuccess(res);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('update');

    res = {
      Success: false,
      ErrorMsg: errorMsg
    };

    AlbumsStore.onUpdateSuccess(res);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('update');
  });
});