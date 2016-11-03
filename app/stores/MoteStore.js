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
      markState: undefined,
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

  onGetInfoCompleted(res){
    if(res.Success){
      const {CityName, Marks, NickName, Signature, TotalAlbums, Views, Avatar, Tags} = res
      // 我干嘛作死都换成小写。。。
      this.data.info = {
        cityName: CityName,
        marks: Marks,
        nickName: NickName,
        signature: Signature,
        totalAlbums: TotalAlbums,
        views: Views,
        avatar: Avatar,
        tags: Tags,
      }

      // 如果不转换成小写，就更方便了，直接可以这么写：
      // this.data.info = {
      //   CityName, Marks, NickName, Signature, TotalAlbums, Views, Avatar, Tags
      // }
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'getInfo'
    this.trigger(this.data)
  },

  onGetInfoFailed(res){
    this.onFailed(res)
  },

  onMarkState(res) {
    this.data.markState = res
    this.data.flag = 'onChangemarkState'
    this.trigger(this.data)
  },

  onAlbumsMarkCompleted(res){
    if(res.Success){
      this.data.markState = true
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'onChangemarkState'
    this.trigger(this.data)
  },

  onAlbumsMarkFailed(res){
    this.onFailed(res)
  },

  onAlbumsUnMarkCompleted(res){
    if(res.Success){
      this.data.markState = false
    }else{
      this.data.hintMessage = res.ErrorMsg
    }
    this.data.flag = 'onChangemarkState'
    this.trigger(this.data)
  },

  onAlbumsUnMarkFailed(res){
    this.onFailed(res)
  },
})

export default MoteStore
