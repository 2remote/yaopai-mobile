import {
  storeIsDefined, storeHasMethod, storeHasData
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
})