import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

var InterviewActions = Reflux.createActions({
  'get' : {children:['success','failed']},
  'search':{children : ['success','failed']}
})

InterviewActions.search.listen(function(pageIndex = 1 ,pageSize = 10){
  var data = {
    PageIndex:pageIndex,
    PageSize:pageSize,
    Fields : 'Id,Cover,Link'
  }
  HttpFactory.post(API.INTERVIEW.search,data,this.success,this.failed)
})

InterviewActions.get.listen(function(Id){
  var data ={
    Id: Id,
    Fields : 'Id,Title,Cover,Content,User.NickName,CityName,User.Avatar,User.Id'
  }
  HttpFactory.post(API.INTERVIEW.get,data,this.success,this.failed)
})

export {InterviewActions as default}