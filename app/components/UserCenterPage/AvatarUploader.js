import React from 'react';
import _ from 'underscore';

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import UserFundActions from '../../actions/UserFundActions';
import UserFundStore from '../../stores/UserFundStore';
import {History,Location} from 'react-router';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import {Button, Toast} from 'react-weui';
import {parseImageUrl} from '../Tools';

class AvatarUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFailedShow: false,
      uploadingShow: false,
      uploadedShow: false,

      userInfo: {},
      progress : 0,
      qiniu: {},
      uploaderOption : {
        runtimes: 'html5,flash,html4',
        browse_button: 'avatarUploader',
        max_file_size: '10mb',
        chunk_size: '4mb',
        domain: 'http://qiniu-plupload.qiniudn.com/',
        auto_start: true,
        get_new_uptoken: true,
        container: 'container',
        init: {
          'FilesAdded': function(up,files){},
          'BeforeUpload': function(up, file) {},
          'UploadProgress': function(up, file) {},
          'UploadComplete': function() {},
          'FileUploaded': function(up, file, info) {},
          'Error': function(up, err, errTip) {}
        },
      },
      token: '',
    }
  }

  componentDidMount(){
    UserActions.currentUser();
    UserFundActions.getUserToken();
  }

  onGetUserToken(data){ // 获取上传头像所需 Token
    if(data.userToken){
      this.setState({
        token: data.userToken
      })
    }
  }

  _onUserStoreChange(data){
    if(!data.isLogin){
      if (!this.props.location) {
        this.history.pushState(null,'/login_page');
      } else {
        this.history.pushState({nextPage : this.props.location.pathname},'/login_page')
      }

    }else{
      //得到当前用户的预约订单
      this.setState({userInfo : data})

      var undefinedLogin = _.isUndefined(this.state.userInfo.isLogin);
      var definedLogin = ! undefinedLogin;
      var emptyQiniu = _.isEmpty(this.state.qiniu);

      if(emptyQiniu && definedLogin && this.state.userInfo.isLogin){
        if(data.flag == 'currentUser'){
          this.initUploader(data.pingToken);
        }
      }
    }
  }

  initUploader(sessionToken){
    var option = this.state.uploaderOption;
    const self = this;
    option.uptoken_func = function(){ // 在需要获取uptoken时，该方法会被调用
      // 如何拿到 this.state ？
      let token = self.state.token;
      if(!token) {
        console.error('没拿到 token !');
      }
      return token;
    };
    option.init.FileUploaded = this.onFileUploaded.bind(this);
    option.init.UploadProgress = this.onUploadProgress.bind(this);
    option.init.Error = this.onErrors.bind(this);
    option.init.BeforeUpload = this.onBeforeUpload.bind(this);
    var qiniu = Qiniu.uploader(option);
    this.setState({qiniu: qiniu});
  }

  onErrors(up, err, errTip) {
    this.handleUploadFailedClick();
    this.setState({uploadingShow : false});
    console.log(up, err, errTip);
  }

  onFileUploaded(up,file,info){
    var res = JSON.parse(info);

    // 上传成功后，更新头像
    UserActions.changeAvatarOnServer(res.Url);

    // 本地更新头像
    var newUserInfo = this.state.userInfo;
    newUserInfo.avatar = res.Url;
    this.setState({userInfo : newUserInfo}, this.setState({uploadingShow : false}));

    this.handleUploadedClick();
    UserActions.currentUser();
  }

  onBeforeUpload(up, file) {
    this.setState({uploadingShow : true});
  }

  onUploadProgress(up,file){
    this.setState({progress :file.percent});
  }

  handleUploadedClick() {
    this.setState({uploadedShow: true}, function () {
      setTimeout(function () {
        this.setState({uploadedShow: false});
      }.bind(this), 2000);
    });
  }

  handleUploadFailedClick() {
    this.setState({uploadFailedShow: true}, function () {
      setTimeout(function () {
        this.setState({uploadFailedShow: false});
      }.bind(this), 3000);
    });
  }

  render() {
    var avatarImage = this.props.defaultImage;
    if(!_.isEmpty(this.state.userInfo.avatar)){
      avatarImage = parseImageUrl(this.state.userInfo.avatar,78,78);
    }
    return (
      <div>
        <div id="container">
          <img id="avatarUploader"
            style={this.props.style}
            src={avatarImage}
          />
        </div>

        <Toast
          show={this.state.uploadingShow}
          icon="loading"
          size="large">
          头像上传中...
        </Toast>

        <Toast
          show={this.state.uploadedShow}
          icon="success"
          size="large">
          头像上传成功！
        </Toast>

        <Toast
          show={this.state.uploadFailedShow}
          icon="warn"
          size="large">
          头像上传失败，请重试！
        </Toast>
      </div>
    );
  }
};

ReactMixin.onClass(AvatarUploader, Reflux.listenTo(UserFundStore, 'onGetUserToken'));
ReactMixin.onClass(AvatarUploader, Reflux.listenTo(UserStore, '_onUserStoreChange'));
ReactMixin.onClass(AvatarUploader, History);

export {AvatarUploader as default};
