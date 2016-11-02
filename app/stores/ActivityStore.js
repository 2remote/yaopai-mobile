import Reflux from 'reflux'
import ActivityActions from '../actions/ActivityActions'

const ActivityStore = Reflux.createStore({
  listenables: ActivityActions,

  init() {
    this.data =  {
      list : [],
      detail : {
        id : '',
        content : ''
      },
      add : {
        isAdd : false
      },
      flag : ''
    }
  },

  // 通用方法
  onFailed(res) {
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  onSearchSuccess(res){
    if(res.Success){
      this.data.list = res.Result
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'getList'
    this.trigger(this.data)
  },

  onGetDetailSuccess(res){
    if(res.Success){
      this.data.detail.id = res.Id
      this.data.detail.content = res.Content
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'getDetail'
    this.trigger(this.data)
  },

  onAddSuccess(res){
    if(res.Success){
      this.data.add.isAdd = res.Success
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'join'
    this.trigger(this.data)
  }
  
})

export default ActivityStore
