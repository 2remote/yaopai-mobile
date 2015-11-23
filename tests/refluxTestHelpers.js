import { expect } from 'chai';

exports.storeIsDefined = (store) => {
  expect(store).to.exist;
};

exports.storeHasData = (store, key = "NA") => {
  if (key == "NA"){
    it('has data object', ()=> {
      expect(store.data).to.exist;
    });
  }else{
    it('has data element << #{key} >>', ()=> {
      expect(store.data[key]).to.exist;
    });
  }
}