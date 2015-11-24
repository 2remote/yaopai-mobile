import {
  storeIsDefined, storeHasMethod
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
})