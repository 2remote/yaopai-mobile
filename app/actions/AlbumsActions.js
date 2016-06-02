import Reflux from 'reflux';
import HttpFactory from '../HttpFactory';
import API from '../api';

var AlbumsActions = Reflux.createActions({
  'get':{children : ['success','failed']},
  'add':{children : ['success','failed']},
  'update':{children : ['success','failed']},
  'delete':{children : ['success','failed']},
  'search':{children : ['success','failed']},
  'searchByTags':{children : ['success','failed']},
  'getMyAlbums' : {children : ['success','failed']},
  'onSale' : {children:['success','failed']},
  'offSale' : {children:['success','failed']},
  'getTagList' : {children:['success','failed']}
});

AlbumsActions.get.listen(function(id){
  var data = {
    Id : id,
    Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,' +
    'Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,' +
    'User.Id,Photographer.NickName,Photographer.Avatar,Views,Price,' +
    'Detail.Duration,Detail.PlateCount,Detail.TruingCount,Detail.CostumeCount,' +
    'Detail.MakeUpSupport,Detail.OriginalSupport,Detail.PhysicalSupport,' +
    'Detail.UnitCount,Detail.SceneCount,Detail.PeopleCount,Detail.SeatCount,Detail.PlaceType',
  };
  HttpFactory.post(API.ALBUMS.get,data,this.success,this.failed);
});

AlbumsActions.search.listen( aaSearch );
AlbumsActions.searchByTags.listen( aaSearch );

function aaSearch (categoryId = null ,pageIndex = 1 ,pageSize = 10, tags=null){
  var data = {
    PageIndex:pageIndex,
    PageSize:pageSize,
    CategoryId : categoryId,
    Tags: tags,
    Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,' +
    'Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,' +
    'User.Id,Photographer.NickName,Photographer.Avatar,Views,Price,' +
    'Detail.Duration,Detail.PlateCount,Detail.TruingCount,Detail.CostumeCount,' +
    'Detail.MakeUpSupport,Detail.OriginalSupport,Detail.PhysicalSupport,' +
    'Detail.UnitCount,Detail.SceneCount,Detail.PeopleCount,Detail.SeatCount,Detail.PlaceType',
  };
  HttpFactory.post(API.ALBUMS.search,data,this.success,this.failed);
}

// http://api.aiyaopai.com/?api=Tag.List&fields=id,name,display,tags.id,tags.name,tags.display
AlbumsActions.getTagList.listen(function () {
  var data = {
    Fields : 'id,name,display,tags.id,tags.name,tags.display'
  };
  HttpFactory.post(API.TAG.list,data,this.success,this.failed);
});

export {AlbumsActions as default};
