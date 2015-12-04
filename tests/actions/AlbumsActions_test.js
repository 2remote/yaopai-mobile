import Reflux from 'reflux';
import {
  makeStoreHasMethod
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import AlbumsActions from '../../app/actions/AlbumsActions';

const albumsActionsHasMethod = makeStoreHasMethod(AlbumsActions);
describe('Albums Actions Test', () => {

  beforeEach(() => {
  });

  it('has methods', () => {
    const methods = [
      'get',
      'add',
      'update',
      'delete',
      'search',
      'getMyAlbums',
      'getCategories',
      'onSale',
      'offSale',
      'recommendList'
    ];
    methods.forEach((method) => {
      albumsActionsHasMethod(method);
    })
  });
});