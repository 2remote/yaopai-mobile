import Reflux from 'reflux'
import AlbumsActions from '../actions/AlbumsActions'

const MakeupArtistAlbumsStore = Reflux.createStore({
  data : {
    flag : '',
    hintMessage : '',
    result : [],
    pageCount: '', // 总页数
    total: '', // 总数据条数
    pageIndex : 0, //当前页
    success: false,
    // count : 0,  //当前查询条件下的列表总数
    // pageSize : 0, //companent设置页面大小
    // markExist: {
    //   isMark: false,
    //   id: '',
    // },
  },
  init: function() {
    this.listenTo(AlbumsActions.makeupArtistAlbumsSearch.success,this.onMakeupArtistAlbumsSearchSuccess)
    this.listenTo(AlbumsActions.makeupArtistAlbumsSearch.failed,this.onFailed)
  },

  onFailed : function(data){
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  // 化妆师作品列表页
  onMakeupArtistAlbumsSearchSuccess(data) {
    if(data.Success) {
      this.data.result = data.Result
      this.data.pageCount = data.PageCount
      this.data.total = data.Total
      this.data.pageIndex = data.PageIndex
      this.data.hintMessage = '查询化妆师全部作品'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'onMakeupArtistAlbumsSearchSuccess'
    this.trigger(this.data)
  },
})

export default MakeupArtistAlbumsStore
