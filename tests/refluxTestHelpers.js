import { expect } from 'chai';

exports.storeIsDefined = (store) => {
  expect(store).to.exist;
};