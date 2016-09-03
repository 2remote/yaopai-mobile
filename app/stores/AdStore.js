import Reflux from 'reflux'
import AdActions from '../actions/AdActions'

var AdStore = Reflux.createStore({
  data : {
    flag : '',
    hintMessage : '',
    workList : [],
    pageIndex : 0, //当前页
    pageSize : 0 //companent设置页面大小
  },
  
  init: function() {
    console.log('Ad Store initialized')
    this.listenTo(AdActions.list.success,this.onListSuccess)
    this.listenTo(AdActions.list.failed,this.onFailed)
  },
  
  onFailed : function(res){
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  onListSuccess : function(res){
    if(res.Success){
      this.data.pageIndex = res.PageIndex
      this.data.pageSize = res.PageSize
  
      this.data.workList = res.Result
      this.data.hintMessage = ''
    }else{
      this.data.workList = []
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'list'
    this.trigger(this.data)
  }
})

export {AdStore as default}