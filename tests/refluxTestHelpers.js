import { expect } from 'chai';

exports.storeIsDefined = (store) => {
  expect(store).to.exist;
};

exports.storeHasData = (store, key = "NA") => {
  if (key == "NA"){
    describe('has data object', () => {
      it('has data object', ()=> {
        expect(store.data).to.exist;
      });
    });
  }else{
    describe('has data element', () => {
      it(`has data element << ${key} >>`, ()=> {
        expect(store.data[key]).to.exist;
      });
    })
  }
};

exports.storeHasMethod = function (store, method) {
  describe('store has method', () => {
    it(`has method methold  << ${method} >>`, ()=> {
      expect(store[method]).to.exist;
    });  
  })
};