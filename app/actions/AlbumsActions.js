import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

const AlbumsActions = Reflux.createActions({
  'get':{children : ['success','failed']},
  'add':{children : ['success','failed']},
  'update':{children : ['success','failed']},
  'delete':{children : ['success','failed']},
  'search':{children : ['success','failed']},
  'query':{children : ['success','failed']},
  'getMyAlbums' : {children : ['success','failed']},
  'onSale' : {children:['success','failed']},
  'offSale' : {children:['success','failed']},
  'getTagList' : {children:['success','failed']},
  'getById' : {children:['success','failed']},
  'mark' : {children : ['success','failed']},
  'unMark' : {children : ['success','failed']},
  'getAlbumId': {},

  // 模特
  'moteAlbumsSearch': {children : ['success','failed']},
})

/*
 根据摄影师Id查询摄影师列表
 */
AlbumsActions.getById.listen(function(id){
  let data = {
    UserId : id,
    Fields : 'Id,Result.Title,Service,Cut',
  }
  HttpFactory.post(API.ALBUMS.getById,data,this.success,this.failed)
})


AlbumsActions.get.listen(function(id){
  let data = {
    Id : id,
    Fields : 'Id,Title,UserId,Description,Service,Price,MarkExist,' +
    'Cover,Cut,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,' +
    'User.Id,Photographer.NickName,Photographer.Avatar,Photographer.Id,Views,Price,' +
    'Detail.Duration,Detail.PlateCount,Detail.TruingCount,Detail.CostumeCount,' +
    'Detail.MakeUpSupport,Detail.OriginalSupport,Detail.PhysicalSupport,Detail.PhysicalDetail,' +
    'Detail.UnitCount,Detail.SceneCount,Detail.PeopleCount,Detail.SeatCount,Detail.PlaceType',
  }
  HttpFactory.post(API.ALBUMS.get,data,this.success,this.failed)
})

AlbumsActions.search.listen( searchQuery )
AlbumsActions.query.listen( searchQuery )

function searchQuery(args = {}) {
  const {
    tags = null,
    key = "",
    pageIndex = 1,
    pageSize = 10,
    priceTag = 100,
    userId,
    mark
  } = args

  let priceStart, priceEnd

  const priceList = {
    100: () => {},
    0: () => {
      priceEnd = 99
    },
    1: () => {
      priceStart = 100
      priceEnd = 499
    },
    2: () => {
      priceStart = 500
      priceEnd = 1999
    },
    3: () => {
      priceStart = 2000
      priceEnd = 4999
    },
    4: () => {
      priceStart = 5000
    },
  }

  priceList[priceTag]()

  const data = {
    tags,
    key,
    priceStart,
    priceEnd,
    pageIndex,
    pageSize,
    userId,
    mark,
    Fields : 'Id,Title,UserId,Description,Service,Price,Marks,MarkExist,' +
    'Cover,Cut,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,' +
    'User.Id,Photographer.NickName,Photographer.CityName,Photographer.Avatar,Views,Price,' +
    'Detail.Duration,Detail.PlateCount,Detail.TruingCount,Detail.CostumeCount,' +
    'Detail.MakeUpSupport,Detail.OriginalSupport,Detail.PhysicalSupport,Detail.PhysicalDetail,' +
    'Detail.UnitCount,Detail.SceneCount,Detail.PeopleCount,Detail.SeatCount,Detail.PlaceType',
  }
  HttpFactory.post(API.ALBUMS.search, data,this.success, this.failed)
}

// http://api.aiyaopai.com/?api=Tag.List&fields=id,name,display,tags.id,tags.name,tags.display
AlbumsActions.getTagList.listen(function () {
  let data = {
    Fields : 'id,name,display,tags.id,tags.name,tags.display'
  }
  HttpFactory.post(API.TAG.list,data,this.success,this.failed)
})

/*
  收藏作品
*/
AlbumsActions.mark.listen(function(id){
  let data = {
    Id : id,
  }
  HttpFactory.post(API.ALBUMS.mark,data,this.success,this.failed)
})

/*
  取消收藏作品
*/
AlbumsActions.unMark.listen(function(id){
  let data = {
    Id : id,
  }
  HttpFactory.post(API.ALBUMS.unMark,data,this.success,this.failed)
})

// 模特
AlbumsActions.moteAlbumsSearch.listen(function(pageSize = 50, pageIndex = 1) {
  let data = {
    pageSize,
    pageIndex,
    Fields: 'Id,Title,Description,Cover,Marks,MarkExist,'
  }
  HttpFactory.post(API.Mote.albumsSearch,data,this.success,this.failed)
})

export {AlbumsActions as default}
