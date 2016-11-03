import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

const ActivityActions = Reflux.createActions({
  search: {children : ['success','failed']},
  getDetail: {children : ['success','failed']},
  add: {children : ['success','failed']}
})

// 获取活动列表信息
ActivityActions.search.listen(function(){
  let data = {
    Fields : 'Id,Cover,Deadline,Title,ProvinceName,HomeRecommended,HomeSorting,IsExternal,Link,EndDate',
  }
  HttpFactory.post(API.ACTIVITY.search, data, this.success, this.failed)
})

// 获取活动列表信息
ActivityActions.getDetail.listen(function(id){
  let data = {
    Id : id,
    Fields : 'Id,Cover,Title,SubTitle,Display,Content,Deadline',
  }
  HttpFactory.post(API.ACTIVITY.get, data, this.success, this.failed)
})

// 获取活动报名信息
ActivityActions.add.listen(function(item){
  let data = {
    activityId : item.id,
    tel : item.tel,
    name : item.name,
    sex : item.gender,
    remarks : item.remark
  }
  HttpFactory.post(API.ACTIVITY.add, data, this.success, this.failed)
})

export default ActivityActions
