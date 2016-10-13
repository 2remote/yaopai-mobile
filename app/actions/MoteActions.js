import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

const MoteActions = Reflux.createActions({
  'getInfo' : {children : ['success','failed']},
})
/*
  得到指定id的摄影师信息
*/
MoteActions.getInfo.listen(function(id){
  let data = {
    Id : id,
    Fields : 'Id,Sales,TotalAlbums,Views,Marks,MarkExist,CityName,NickName,Avatar,Signature,Tags.Name',
  }
  HttpFactory.post(API.Mote.getInfo,data,this.success,this.failed)
})

export default MoteActions
