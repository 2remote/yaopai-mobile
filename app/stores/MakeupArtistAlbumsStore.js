import Reflux from 'reflux'
import AlbumsActions from '../actions/AlbumsActions'

const MakeupArtistAlbumsStore = Reflux.createStore({
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
    total : 0, //当前查询条件下的作品总数
    markExist: {
      isMark: false,
      id: '',
    },
  },
  init: function() {
    this.listenTo(AlbumsActions.makeupArtistAlbumsSearch.success,this.onMakeupArtistAlbumsSearchSuccess)
    this.listenTo(AlbumsActions.makeupArtistAlbumsSearch.failed,this.onFailed)
  },

  onFailed : function(res){
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  // 化妆师作品列表页
  onMakeupArtistAlbumsSearchSuccess(res) {
    console.log(res)
  },
})

export default MakeupArtistAlbumsStore
