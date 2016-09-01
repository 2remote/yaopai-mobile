import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

var CallActions = Reflux.createActions({
  'call':{children : ['success','failed']}
})

CallActions.call.listen(function(userId){
  var data = {
    Id: userId,
  }
  HttpFactory.post(API.CALL.call,data,this.success,this.failed)
})

export {CallActions as default}