import React from 'react';
import API from '../../api';

import _ from 'underscore';

import Reflux from 'reflux';
import {History,Location} from 'react-router';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import {Button, Toast} from 'react-weui';
import {parseImageUrl} from '../Tools';

var AvatarUploader = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
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
        uptoken_url: API.FILE.user_token_url,
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
        }
      },
    }
  },

  getDefaultProps : function(){
    return {
      width : '80',  //图片高度
      height : '80', //指定图片高度
      type : 'user',  //必须指定图片类型 user, work...
      progress:0,
      onUpload : function(data){},  //上传成功后回调函数
      //onFileUploaded : function(up, file, info){},
      //onUploadProgress : function(up, file){}
    }
  },

  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    }else{
      //得到当前用户的预约订单
      this.setState({userInfo : data})
      // console.log(this.state.userInfo);

      var undefinedLogin = _.isUndefined(this.state.userInfo.isLogin);
      var definedLogin = ! undefinedLogin;
      var emptyQiniu = _.isEmpty(this.state.qiniu);

      if(emptyQiniu && definedLogin && this.state.userInfo.isLogin){
        var option = this.state.uploaderOption;
        option.init.FileUploaded = this.onFileUploaded;
        option.init.UploadProgress = this.onUploadProgress;
        option.init.Error = this.onErrors;
        option.init.BeforeUpload = this.onBeforeUpload;
        var qiniu = Qiniu.uploader(option);
        this.setState({qiniu: qiniu});
        // console.log(qiniu);
      }else{
        this.setState({qiniu: {}});
      }
    }
  },

  onErrors : function (up, err, errTip) {
    this.handleUploadFailedClick();
    this.setState({uploadingShow : false});
    console.log(up, err, errTip);
  },

  onFileUploaded : function(up,file,info){
    // console.log("onFileUploaded");
    var res = JSON.parse(info);
    
    // 上传成功后，更新头像
    UserActions.changeAvatarOnServer(res.Url);

    // 本地更新头像
    var newUserInfo = this.state.userInfo;
    newUserInfo.avatar = res.Url;
    this.setState({userInfo : newUserInfo}, this.setState({uploadingShow : false}));

    this.handleUploadedClick();
    UserActions.currentUser();
  },

  onBeforeUpload : function (up, file) {
    this.setState({uploadingShow : true});
  },

  onUploadProgress : function(up,file){
    // console.log("onUploadProgress");
    // console.log(JSON.stringify(file))
    this.setState({progress :file.percent});
  },

  componentDidMount : function() {
    UserActions.currentUser();
  },

  handleUploadedClick : function () {
    this.setState({uploadedShow: true}, function () {
      setTimeout(function () {
        this.setState({uploadedShow: false});
      }.bind(this), 2000);  
    });
  },

  handleUploadFailedClick : function () {
    this.setState({uploadFailedShow: true}, function () {
      setTimeout(function () {
        this.setState({uploadFailedShow: false});
      }.bind(this), 3000);  
    });
  },

  render: function () {
    var avatarImage = this.props.defaultImage;
    if(!_.isEmpty(this.state.userInfo.avatar)){
      avatarImage = parseImageUrl(this.state.userInfo.avatar,78,78);
    }

    return (
      <div>
        <div id="container">
          <img id="avatarUploader"
            style={this.props.style}
            src={avatarImage} />
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
});

export {AvatarUploader as default};