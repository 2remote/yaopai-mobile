import Reflux from 'reflux'
import ActivityActions from '../actions/ActivityActions'

const ActivityStore = Reflux.createStore({
  listenables: ActivityActions,

  init() {
    this.data =  {
      list : [],
      detail : {
        Id : '',
        Content : '',
        Deadline : '',
        Title : '',
        SubTitle : '',
        Cover : ''
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

  onSearchCompleted(res){
    if(res.Success){
      this.data.list = res.Result
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'getList'
    this.trigger(this.data)
  },

  onSearchFailed(res) {
    this.onFailed(res)
  },

  onGetDetailCompleted(res){
    if(res.Success){
      this.data.detail.Id = res.Id
      this.data.detail.Content = res.Content
      this.data.detail.Deadline = res.Deadline
      this.data.detail.SubTitle = res.SubTitle
      this.data.detail.Title = res.Title
      this.data.detail.Cover = res.Cover
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'getDetail'
    this.trigger(this.data)
  },

  onAddCompleted(res){
    if(res.Success){
      this.data.add.isAdd = res.Success
    }else{
      this.data.add.isAdd = res.Success
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'join'
    this.trigger(this.data)
  }
})

export default ActivityStore
