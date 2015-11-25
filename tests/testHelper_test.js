import {
  storeIsDefined, storeHasMethod, storeHasData, storeCheckCommonUsage
}
from './refluxTestHelpers';

describe('test helpers', () => {
  it('is a defined store', ()=> {
    let store = {};
    storeIsDefined(store);
  });

  it('has a defined method', ()=> {
    let store = {
      demoMethod: () => {}
    };
    storeHasMethod(store, 'demoMethod');
  });

  it('has a data', ()=> {
    let store = {
      data: {
        demo: 1,
      }
    }
    storeHasData(store);
    storeHasData(store, 'demo');
  });

  it('will check a method for common usage', () => {
    const store = {
      name: 'testDemoStore',
      data: {},
      onGetSuccess: function (res) {
        if(res.Success){
          this.data.photographer = res;
          this.data.hintMessage = '';
        }else{
          this.data.hintMessage = res.ErrorMsg;
        }
        this.data.flag = 'get';
      }
    };

    storeCheckCommonUsage(store, 'onGetSuccess', 'get');
  });
})