import Reflux from 'reflux'
import AlbumsActions from '../actions/AlbumsActions'

const MoteAlbumsStore = Reflux.createStore({
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
    // 模特
    this.listenTo(AlbumsActions.moteAlbumsSearch.success,this.onMoteAlbumsSearchSuccess)
    this.listenTo(AlbumsActions.moteAlbumsSearch.failed,this.onFailed)
  },

  onFailed : function(res){
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  // 模特作品列表页
  onMoteAlbumsSearchSuccess(res) {
    console.log(res)
  },
})

export default MoteAlbumsStore
