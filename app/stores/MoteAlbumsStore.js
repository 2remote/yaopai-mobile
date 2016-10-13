import Reflux from 'reflux'
import AlbumsActions from '../actions/AlbumsActions'

const MoteAlbumsStore = Reflux.createStore({
  data : {
    flag : '',
    hintMessage : '',
    result : [],
    pageCount: '', // 总页数
    total: '', // 总数据条数
    pageIndex : 0, //当前页
    success: false,
    tagListResult: [],
    tagListTotal: '',
    // count : 0,  //当前查询条件下的列表总数
    // pageSize : 0, //companent设置页面大小
    // markExist: {
    //   isMark: false,
    //   id: '',
    // },
  },
  init: function() {
    this.listenTo(AlbumsActions.moteAlbumsSearch.success,this.onMoteAlbumsSearchSuccess)
    this.listenTo(AlbumsActions.moteAlbumsSearch.failed,this.onFailed)

    // this.listenTo(AlbumsActions.makeupArtistTagList.success,this.onMakeupArtistTagListuccess)
    // this.listenTo(AlbumsActions.makeupArtistTagList.failed,this.onFailed)
  },

  onFailed : function(data){
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  // 化妆师作品列表页
  onMoteAlbumsSearchSuccess(data) {
    if(data.Success) {
      this.data.result = data.Result
      this.data.pageCount = data.PageCount
      this.data.total = data.Total
      this.data.pageIndex = data.PageIndex
      this.data.hintMessage = '查询模特全部作品'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'onMoteAlbumsSearchSuccess'
    this.trigger(this.data)
  },

  // onMakeupArtistTagListuccess(data) {
  //   if(data.Success) {
  //     this.data.tagListResult = data.Result
  //     this.data.tagListTotal = data.Total
  //     this.data.hintMessage = '查询化妆师标签列表'
  //     this.data.success = true
  //   } else {
  //     this.data.success = false
  //     this.data.hintMessage = data.ErrorMsg
  //   }
  //   this.data.flag = 'onMakeupArtistTagListuccess'
  //   this.trigger(this.data)
  // },
})

export default MoteAlbumsStore
