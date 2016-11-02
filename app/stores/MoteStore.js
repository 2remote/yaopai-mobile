import Reflux from 'reflux'
import MoteActions from '../actions/MoteActions'

const MoteStore = Reflux.createStore({
  listenables: MoteActions,

  init() {
    this.data =  {
      info: {
        cityName: '',
        marks: '',
        nickName: '',
        signature: '',
        totalAlbums: '',
        views: '',
        avatar: '',
        tags: [],
      },
      hintMessage: '',
      flag: '',
    }
  },

  // 通用方法
  onFailed(res) {
    this.data.hintMessage = '网络错误'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },

  onGetInfoFailed(res){
    this.onFailed(res)
  },

  onGetInfoCompleted(res){
    if(res.Success){
      this.data.info.cityName = res.CityName
      this.data.info.marks = res.Marks
      this.data.info.nickName = res.NickName
      this.data.info.signature = res.Signature
      this.data.info.totalAlbums = res.TotalAlbums
      this.data.info.views = res.Views
      this.data.info.avatar = res.Avatar
      this.data.info.tags = res.Tags
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'getInfo'
    this.trigger(this.data)
  },
})

export default MoteStore
