import Reflux from 'reflux';

import PhotographerAlbumPoolAction from '../actions/PhotographerAlbumPoolAction';

const PhotographerAlbumPoolStore = Reflux.createStore({
  getInitialState: function() {
    return Object.assign({}, this.pool);
  },
  init: function() {
    this.listenTo(PhotographerAlbumPoolAction.update.success, this.update);
    this.pool = {};
  },
  update: function(resp) {
    if(resp.Success && resp.Result && resp.Result.length) {
      this.pool[resp.Result[0].UserId] = resp.Result;
    }
    this.trigger(Object.assign({}, this.pool));
  },
});

export default PhotographerAlbumPoolStore;