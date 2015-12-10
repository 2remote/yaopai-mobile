import Reflux from 'reflux';
import {
  makeStoreHasMethod,
  apiOk
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import API from '../../app/api';

import PhotographerActions from '../../app/actions/PhotographerActions';

const photographerActionsHasMethod = makeStoreHasMethod(PhotographerActions);
describe('Photographer Actions Test', () => {
  let data;
  beforeEach(() => {
    data ={}
  });

  it('has methods', () => {
    const methods = [
      'get',
      'list',
      'recommendList',
    ];
    methods.forEach((method) => {
      photographerActionsHasMethod(method);
    })
  });
  
});