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
      makeupArtist: {
        id: '',
        nickName: '',
        avatar: '',
        signature: '',
      },
    }
  },
  init: function() {
    this.listenTo(AlbumsActions.makeupArtistAlbumsSearch.success,this.onMakeupArtistAlbumsSearchSuccess)
    this.listenTo(AlbumsActions.makeupArtistAlbumsSearch.failed,this.onFailed)

    this.listenTo(AlbumsActions.makeupArtistTagList.success,this.onMakeupArtistTagListSuccess)
    this.listenTo(AlbumsActions.makeupArtistTagList.failed,this.onFailed)

    this.listenTo(AlbumsActions.makeupArtistGetAlbumsDetail.success,this.onMakeupArtistGetAlbumsDetailSuccess)
    this.listenTo(AlbumsActions.makeupArtistGetAlbumsDetail.failed,this.onFailed)
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

  onMakeupArtistTagListSuccess(data) {
    if(data.Success) {
      this.data.tagListResult = data.Result
      this.data.tagListTotal = data.Total
      this.data.hintMessage = '查询化妆师标签列表'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'onMakeupArtistTagListuccess'
    this.trigger(this.data)
  },

  // 作品详情
  onMakeupArtistGetAlbumsDetailSuccess(data) {
    if(data.Success) {
      this.data.albumsDetail.title = data.Title
      this.data.albumsDetail.description = data.Description
      this.data.albumsDetail.cover = data.Cover
      this.data.albumsDetail.markExist = data.MarkExist
      this.data.albumsDetail.tags = data.Tags
      this.data.albumsDetail.photos = data.Photos

      this.data.albumsDetail.makeupArtist.id = data.MakeupArtist.Id
      this.data.albumsDetail.makeupArtist.nickName = data.MakeupArtist.NickName
      this.data.albumsDetail.makeupArtist.avatar = data.MakeupArtist.Avatar
      this.data.albumsDetail.makeupArtist.signature = data.MakeupArtist.Signature
      this.data.hintMessage = '查询化妆师作品详情'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'onMakeupArtistGetAlbumsDetailSuccess'
    this.trigger(this.data)
  }
})

export default MakeupArtistAlbumsStore
