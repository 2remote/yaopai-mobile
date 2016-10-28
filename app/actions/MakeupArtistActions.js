import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

const MakeupArtistActions = Reflux.createActions({
  getInfo: {asyncResult: true},
  albumsMark: {asyncResult: true},
  albumsUnMark: {asyncResult: true},
  markState: {},
})

// 得到指定id的摄影师信息
MakeupArtistActions.getInfo.listen(function(id){
  let data = {
    Id : id,
    Fields : 'Id,Sales,TotalAlbums,Views,Marks,MarkExist,CityName,NickName,Avatar,Signature,Tags.Name',
  }
  HttpFactory.post(API.MakeupArtist.getInfo, data, this.completed, this.failed)
})

// 关注作品
MakeupArtistActions.albumsMark.listen(function(id){
  let data = {id}
  HttpFactory.post(API.MakeupArtist.albumsMark, data, this.completed, this.failed)
})

// 取消作品
MakeupArtistActions.albumsUnMark.listen(function(id){
  let data = {id}
  HttpFactory.post(API.MakeupArtist.albumsUnMark, data, this.completed, this.failed)
})

export default MakeupArtistActions
