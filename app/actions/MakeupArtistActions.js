import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

const MakeupArtistActions = Reflux.createActions({
  'getInfo' : {children : ['success','failed']},
})
/*
  得到指定id的摄影师信息
*/
MakeupArtistActions.getInfo.listen(function(id){
  let data = {
    Id : id,
    Fields : 'Id,Sales,TotalAlbums,Views,Marks,MarkExist,CityName,NickName,Avatar,Signature',
  }
  HttpFactory.post(API.MakeupArtist.getInfo,data,this.success,this.failed)
})

export default MakeupArtistActions
