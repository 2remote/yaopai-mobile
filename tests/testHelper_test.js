import {
  storeIsDefined
}
from './refluxTestHelpers';

describe('test helpers', () => {
  it('is a defined store', ()=> {
    let store = {};
    storeIsDefined(store);
  });
})