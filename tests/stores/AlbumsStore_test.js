import Reflux from 'reflux';
import {
  storeIsDefined,
  storeHasData,
  storeHasMethod,
  storeCheckCommonUsage,
  makeStoreHasMethod
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import AlbumsStore from '../../app/stores/AlbumsStore';

const albumsStoreHasMethod = makeStoreHasMethod(AlbumsStore);

describe('Albums Store Test', () => {
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
    AlbumsStore.data.hintMessage = '';
    AlbumsStore.data.flag = '';
  });

  it('has store', () => {
    storeIsDefined(AlbumsStore);
    storeHasData(AlbumsStore);
  });

  describe('has methods', () => {
    const methods = [
      'onFailed',
      'onAddSuccess',
      'onGetSuccess',
      'onUpdateSuccess',
      'onDeleteSuccess',
      'onSearchSuccess',
      'onGetMyAlbumsSuccess',
      'onSaleSuccess',
      'offSaleSuccess',
      'onRecommendListSuccess'
    ];
    methods.forEach((method) => {
      albumsStoreHasMethod(method);
    })
  });

  it('works on failed', () => {
    AlbumsStore.onFailed();
    expect(AlbumsStore.data.hintMessage).to.equal('网络错误');
    expect(AlbumsStore.data.flag).to.equal('failed');
  });

  storeCheckCommonUsage(AlbumsStore, 'onAddSuccess', 'add');

  describe('works on get success', () => {
    storeCheckCommonUsage(AlbumsStore, 'onGetSuccess', 'get');
    AlbumsStore.onGetSuccess(successfulRes);
    expect(AlbumsStore.data.workData).to.equal(successfulRes);

    AlbumsStore.onGetSuccess(failedRes);
    expect(AlbumsStore.data.workData).is.empty;
  });

  storeCheckCommonUsage(AlbumsStore, 'onUpdateSuccess', 'update');

  storeCheckCommonUsage(AlbumsStore, 'onDeleteSuccess', 'delete');

  describe('works on search success', () => {
    // 有数据的时候
    let res = {
      Success: true,
      Count: 1,
      PageIndex: 1,
      PageCount: 1,
      PageSize: 1,
      Total: 1,
      Result: [1, 2, 3]
    };

    AlbumsStore.onSearchSuccess(res);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('search');

    it('has datas', () => {
      const keys = [
        'count',
        'pageCount',
        'pageIndex',
        'pageSize',
        'total',
        'workList'
      ];
      keys.map(function (key) {
        storeHasData(AlbumsStore, key);
      })
    });

    // 没有数据的时候
    AlbumsStore.onSearchSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.workList).is.empty;
    expect(AlbumsStore.data.flag).to.equal('search');
  });

  describe('works on get my albums success', () => {
    storeCheckCommonUsage(AlbumsStore, 'onGetMyAlbumsSuccess', 'getMyAlbums', 'workList');

    AlbumsStore.onGetMyAlbumsSuccess(failedRes);
    expect(AlbumsStore.data.workList).is.empty;
  });

  storeCheckCommonUsage(AlbumsStore, 'onSaleSuccess', 'onSale');

  storeCheckCommonUsage(AlbumsStore, 'offSaleSuccess', 'offSale');
});