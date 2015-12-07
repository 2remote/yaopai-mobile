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

import OrderStore from '../../app/stores/OrderStore';

describe('Order Store Test', () => {
  const successfulRes = {
    Success: true,
    Result: [1, 2, 3]
  };

  const errorMsg = 'error message';

  const failedRes = {
    Success: false,
    ErrorMsg: errorMsg
  };

  const checkOrderStoreData = makeCheckStoreData(OrderStore);
  const orderStoreHasMethod = makeStoreHasMethod(OrderStore);

  beforeEach(() => {
    OrderStore.data = {
      hintMessage: '',
      flag: '',
    };
  });

  it('has store', () => {
    storeIsDefined(OrderStore);
    storeHasData(OrderStore);
  });



  it('store has methods', () => {
    const methods = [
      'onListOrders',
      'onGetOrder',
      'onComfirmOrder',
      'onBookOrder',
      'onCloseOrder',
      'onFailed'
    ];
    methods.forEach((method) => {
      orderStoreHasMethod(method);
    })
  });

  describe('onListOrders', () => {
    it('works on successfulRes', () => {
      OrderStore.onListOrders(successfulRes);
      checkOrderStoreData('orders', successfulRes.Result);
      checkOrderStoreData('hintMessage', '');
      checkOrderStoreData('success', true);
      checkOrderStoreData('flag', 'list');
    });

    it('works on failedRes', () => {
      OrderStore.onListOrders(failedRes);
      expect(OrderStore.data.orders).is.empty;
      checkOrderStoreData('hintMessage', errorMsg);
      checkOrderStoreData('success', false);
      checkOrderStoreData('flag', 'list');
    });
  });

  describe('onGetOrder', () => {
    it('works on successfulRes', () => {
      OrderStore.onGetOrder(successfulRes);
      checkOrderStoreData('order', successfulRes);
      checkOrderStoreData('hintMessage', '');
      checkOrderStoreData('success', true);
      checkOrderStoreData('flag', 'get');
    });

    it('works on failedRes', () => {
      OrderStore.onGetOrder(failedRes);
      expect(OrderStore.data.order).is.empty;
      checkOrderStoreData('hintMessage', errorMsg);
      checkOrderStoreData('success', false);
      checkOrderStoreData('flag', 'get');
    });
  });

  describe('onComfirmOrder', () => {
    it('work on successfulRes', () => {
      OrderStore.onComfirmOrder(successfulRes);
      checkOrderStoreData('hintMessage', '确认订单成功！');
      checkOrderStoreData('success', true);
      checkOrderStoreData('flag', 'confirm');
    });

    it('works on failedRes', () => {
      OrderStore.onComfirmOrder(failedRes);
      checkOrderStoreData('hintMessage', errorMsg);
      checkOrderStoreData('success', false);
      checkOrderStoreData('flag', 'confirm');
    });
  });

  describe('onBookOrder', () => {
    it('works on successfulRes', () => {
      OrderStore.onBookOrder(successfulRes);
      checkOrderStoreData('hintMessage', '预订成功！');
      expect(OrderStore.data.order).is.deep.equal({Id: successfulRes.Result});
      checkOrderStoreData('success', true);
      checkOrderStoreData('flag', 'add');
    });

    it('works on failedRes', () => {
      OrderStore.onBookOrder(failedRes);
      checkOrderStoreData('hintMessage', errorMsg);
      checkOrderStoreData('success', false);
      checkOrderStoreData('flag', 'add');
    });
  });

  describe('onCloseOrder', () => {
    it('works on successfulRes', () => {
      OrderStore.onCloseOrder(successfulRes);
      checkOrderStoreData('hintMessage', '关闭订单成功！');
      checkOrderStoreData('success', true);
      checkOrderStoreData('flag', 'close');
    });

    it('works on failedRes', () => {
      OrderStore.onCloseOrder(failedRes);
      checkOrderStoreData('hintMessage', errorMsg);
      checkOrderStoreData('success', false);
      checkOrderStoreData('flag', 'close');
    });
  });

  it('onFailed', () => {
    OrderStore.onFailed();
    checkOrderStoreData('hintMessage', '网络错误！');
    checkOrderStoreData('flag', 'failed');
  });
});