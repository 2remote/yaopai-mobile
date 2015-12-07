import Reflux from 'reflux';
import {
  makeStoreHasMethod
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

var request = require('superagent');

import API from '../../app/api';

import AlbumsActions from '../../app/actions/AlbumsActions';

const albumsActionsHasMethod = makeStoreHasMethod(AlbumsActions);
describe('Albums Actions Test', () => {

  beforeEach(() => {});

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

  describe('getCategories', () => {
    it('works on success', (done) => {
      request
        .post(API.ALBUMS.categories)
        .set('Content-Type', 'application/json')
        .send('{"Fields":"Id,Name,Sorting,Display,Views"}')
        .withCredentials()

      .end(function(err, res) {
        // 保证err为null，可以初步证明api可用
        expect(err).to.equal(null);
        // 保证Result大于0，证明数据库有分类数据
        const results = eval('(' + res.text + ')');
        expect(results.Result.length > 0).to.equal(true);
        done();
      });
    });
  });
});