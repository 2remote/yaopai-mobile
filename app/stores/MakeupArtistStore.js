import Reflux from 'reflux'
import MakeupArtistActions from '../actions/MakeupArtistActions'

const MakeupArtistStore = Reflux.createStore({
  data: {
    makeupArtistInfo: {
      cityName: '',
      marks: '',
      nickName: '',
      signature: '',
      totalAlbums: '',
      views: '',
      avatar: '',
      tags: [],
      hintMessage: '',
    }
  },
  init: function() {
    this.listenTo(MakeupArtistActions.getInfo.success,this.onGetSuccess)
    this.listenTo(MakeupArtistActions.getInfo.failed,this.onFailed)
  },

  onFailed : function(data){
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  onGetSuccess : function(res){
    if(res.Success){
      this.data.cityName = res.CityName
      this.data.marks = res.Marks
      this.data.nickName = res.NickName
      this.data.signature = res.Signature
      this.data.totalAlbums = res.TotalAlbums
      this.data.views = res.Views
      this.data.avatar = res.Avatar
      this.data.tags = res.Tags
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'getInfo'
    this.trigger(this.data)
  },
})

export default MakeupArtistStore
