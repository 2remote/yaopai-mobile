var React = require ('react');
var API = require('../../api');

var _ = require('underscore');

var Reflux = require('reflux');
import {History,Location} from 'react-router';
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');

var AvatarUploader = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      userInfo: {},
      imageUrl : '',
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
      this.history.pushState({netxPage : this.props.location.pathname},'/login_page');
    }else{
      //得到当前用户的预约订单
      this.setState({userInfo : data})
      console.log(this.state.userInfo);

      var undefinedLogin = _.isUndefined(this.state.userInfo.isLogin);
      var definedLogin = ! undefinedLogin;
      var emptyQiniu = _.isEmpty(this.state.qiniu);

      if(emptyQiniu && definedLogin && this.state.userInfo.isLogin){
        var option = this.state.uploaderOption;
        option.init.FileUploaded = this.onFileUploaded;
        option.init.UploadProgress = this.onUploadProgress;
        option.init.Error = this.onErrors;
        var qiniu = Qiniu.uploader(option);
        this.setState({qiniu: qiniu});
        console.log(qiniu);
      }
    }
  },

  onErrors : function (up, err, errTip) {
    console.log(up, err, errTip);
  },

  onFileUploaded : function(up,file,info){
    console.log("onFileUploaded");
    var res = JSON.parse(info);
    this.setState({imageUrl : res.Url});
    this.props.onUpload(res.Url); //上传成功后可以回调onUpload函数
  },


  onUploadProgress : function(up,file){
    console.log("onUploadProgress");
    console.log(JSON.stringify(file))
    this.setState({progress :file.percent});
    //this.props.progress = file.percent;
  },

  componentDidMount : function() {
    UserActions.currentUser();
  },

  render: function () {
    return (
      <div>
        <div id="container">
          <img id="avatarUploader"
            style={this.props.style}
            src={this.props.defaultImage} />
        </div>
      </div>
    );
  }
});

module.exports = AvatarUploader;