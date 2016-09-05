import Reflux from 'reflux';
import HttpFactory from '../HttpFactory';
import API from '../api';

var PhotographerAlbumPoolAction = Reflux.createActions({
  'update': {children : ['success','error']}
});

PhotographerAlbumPoolAction.update.listen(function(id) {
  var data = {
    Fields : 'Id,UserId,Title,Service,Cover',
    UserId: id,
    PageIndex: 1,
    PageSize: 3,
  };
  HttpFactory.post(API.ALBUMS.getById, data, this.success, this.error);
});

export default PhotographerAlbumPoolAction;
