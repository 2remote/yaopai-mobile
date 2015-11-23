import { expect } from 'chai';

exports.storeIsDefined = (store) => {
  expect(store).is.a('Object');
}