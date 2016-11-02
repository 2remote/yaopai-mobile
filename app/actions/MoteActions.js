import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

const MoteActions = Reflux.createActions({
  getInfo: {asyncResult: true},
  albumsMark: {asyncResult: true},
  albumsUnMark: {asyncResult: true},
  markState: {},
})

// 得到指定id的摄影师信息
MoteActions.getInfo.listen(function(id){
  let data = {
    Id : id,
    Fields : 'Id,Sales,TotalAlbums,Views,Marks,MarkExist,CityName,NickName,Avatar,Signature,Tags.Name',
  }
  HttpFactory.post(API.Mote.getInfo, data, this.completed, this.failed)
})

// 关注作品
MoteActions.albumsMark.listen(function(id){
  let data = {id}
  HttpFactory.post(API.Mote.albumsMark, data, this.completed, this.failed)
})

// 取消作品
MoteActions.albumsUnMark.listen(function(id){
  let data = {id}
  HttpFactory.post(API.Mote.albumsUnMark, data, this.completed, this.failed)
})

export default MoteActions
