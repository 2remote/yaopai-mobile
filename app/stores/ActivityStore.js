import Reflux from 'reflux'
import ActivityActions from'../actions/ActivityActions'

var ActivityStore = Reflux.createStore({
  data : {
    flag : '',
    hintMessage : '',
    workData : {},
    categories : [],
    workList : [],
    count : 0,  //当前查询条件下的列表总数
    pageCount : 0, //当前查询条件下的总页数
    pageIndex : 0, //当前页
    pageSize : 0, //companent设置页面大小
    total : 0 //当前查询条件下的作品总数
  },
  
  init: function() {
    console.log('Activity Store initialized')
    this.listenTo(ActivityActions.get.success,this.onGetListSuccess)
    this.listenTo(ActivityActions.get.failed,this.onFailed)
    this.listenTo(ActivityActions.search.success,this.onSearchSuccess)
    this.listenTo(ActivityActions.search.failed,this.onFailed)
  },
  
  onFailed : function(res){
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  onSearchSuccess : function(res){
    if(res.Success){
      this.data.count = res.Count
      this.data.pageCount = res.PageCount
      this.data.pageIndex = res.PageIndex
      this.data.pageSize = res.PageSize
      this.data.total = res.Total
      this.data.workList = res.Result
      this.data.hintMessage = ''
    }else{
      this.data.workList = []
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'search'
    this.trigger(this.data)
  },

  onGetListSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = ''
      this.data.workData = res
    }else{
      this.data.hintMessage = res.ErrorMsg
      this.data.workData = []
    }
    this.data.flag = 'get'
    this.trigger(this.data)
  }
})

export {ActivityStore as default}