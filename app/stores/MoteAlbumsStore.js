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
    albumsDetail: {
      title: '',
      description: '',
      cover: '',
      markExist: '',
      tags: [],
      photos: [],
      mote: {
        id: '',
        nickName: '',
        avatar: '',
        signature: '',
      },
    },
  },
  init: function() {
    this.listenTo(AlbumsActions.moteAlbumsSearch.success,this.onMoteAlbumsSearchSuccess)
    this.listenTo(AlbumsActions.moteAlbumsSearch.failed,this.onFailed)

    this.listenTo(AlbumsActions.moteTagList.success,this.onMoteTagListuccess)
    this.listenTo(AlbumsActions.moteTagList.failed,this.onFailed)

    this.listenTo(AlbumsActions.moteGetAlbumsDetail.success,this.onMoteGetAlbumsDetailSuccess)
    this.listenTo(AlbumsActions.moteGetAlbumsDetail.failed,this.onFailed)
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

  // 作品标签
  onMoteTagListuccess(data) {
    if(data.Success) {
      this.data.tagListResult = data.Result
      this.data.tagListTotal = data.Total
      this.data.hintMessage = '查询模特标签列表'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'onMoteTagListuccess'
    this.trigger(this.data)
  },

  // 作品详情
  onMoteGetAlbumsDetailSuccess(data) {
    if(data.Success) {
      this.data.albumsDetail.title = data.Title
      this.data.albumsDetail.description = data.Description
      this.data.albumsDetail.cover = data.Cover
      this.data.albumsDetail.markExist = data.MarkExist
      this.data.albumsDetail.tags = data.Tags
      this.data.albumsDetail.photos = data.Photos

      this.data.albumsDetail.mote.id = data.Mote.Id
      this.data.albumsDetail.mote.nickName = data.Mote.NickName
      this.data.albumsDetail.mote.avatar = data.Mote.Avatar
      this.data.albumsDetail.mote.signature = data.Mote.Signature
      this.data.hintMessage = '查询模特作品详情'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'onMoteGetAlbumsDetailSuccess'
    this.trigger(this.data)
  },
})

export default MoteAlbumsStore
