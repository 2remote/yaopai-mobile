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
    let store = Reflux.createStore({
      init: function() {
        console.log('test store initialized');
        this.listenTo(AlbumsActions.getCategories.success, this.onSuccess);
        this.listenTo(AlbumsActions.getCategories.failed, this.onFailed);
      },
      onSuccess: function(data) {
        console.log('store data success', data);
        this.data = 'success';
        this.trigger(this.data);
      },
      onFailed: function(data) {
        console.log('store data failed', data);
        this.data = 'failed';
        this.trigger(this.data);
      }
    });

    function ConsoleComponent() {
      store.listen(function(status) {
        console.log('status: ', status);
      });
    };

    var consoleComponent = new ConsoleComponent();

    it('works on success', (done) => {
      try {
        AlbumsActions.getCategories.success.trigger(4);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});