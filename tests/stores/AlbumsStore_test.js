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
      'onGetCategoriesSuccess',
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

  it('works on delete success', () => {
    AlbumsStore.onDeleteSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('delete');

    AlbumsStore.onDeleteSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('delete');
  });

  it('works on search success', () => {
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

    storeHasData(AlbumsStore, 'count');
    storeHasData(AlbumsStore, 'pageCount');
    storeHasData(AlbumsStore, 'pageIndex');
    storeHasData(AlbumsStore, 'pageSize');
    storeHasData(AlbumsStore, 'total');
    storeHasData(AlbumsStore, 'workList');

    // 没有数据的时候
    AlbumsStore.onSearchSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.workList).is.empty;
    expect(AlbumsStore.data.flag).to.equal('search');
  });

  it('works on get my albums success', () => {
    AlbumsStore.onGetMyAlbumsSuccess(successfulRes);
    expect(AlbumsStore.data.workList).to.equal(successfulRes.Result);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('getMyAlbums');

    AlbumsStore.onGetMyAlbumsSuccess(failedRes);
    expect(AlbumsStore.data.workList).is.empty;
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('getMyAlbums');
  });

  it('works on get catagoies success', () => {
    AlbumsStore.onGetCategoriesSuccess(successfulRes);
    expect(AlbumsStore.data.categories).to.equal(successfulRes.Result);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('getCategories');

    AlbumsStore.onGetCategoriesSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('getCategories');
  });

  it('works on sale success', () => {
    AlbumsStore.onSaleSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('onSale');

    AlbumsStore.onSaleSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('onSale');    
  });

  it('works off sale success', () => {
    AlbumsStore.offSaleSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.flag).to.equal('offSale');

    AlbumsStore.offSaleSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('offSale');
  });

  it('works on recommend list success', () => {
    AlbumsStore.onRecommendListSuccess(successfulRes);
    expect(AlbumsStore.data.hintMessage).is.empty;
    expect(AlbumsStore.data.workList).to.equal(successfulRes.Result);

    AlbumsStore.onRecommendListSuccess(failedRes);
    expect(AlbumsStore.data.hintMessage).to.equal(errorMsg);
    expect(AlbumsStore.data.flag).to.equal('recommendList');
  });
});