var React = require ('react');
var API = require('../../api');

var AvatarUploader = React.createClass({
  getInitialState : function(){
    return {
      imageUrl : '',
      progress : 0,
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

  onFileUploaded : function(up,file,info){
    var res = JSON.parse(info);
    this.setState({imageUrl : res.Url});
    this.props.onUpload(res.Url); //上传成功后可以回调onUpload函数
  },


  onUploadProgress : function(up,file){
    console.log(JSON.stringify(file))
    this.setState({progress :file.percent});
    //this.props.progress = file.percent;
  },

  componentDidMount : function() {
    var uploaderOption = this.state.uploaderOption;
    uploaderOption.init.FileUploaded = this.onFileUploaded;
    uploaderOption.init.UploadProgress = this.onUploadProgress;
    var qiniu = Qiniu.uploader(uploaderOption);

    console.log(qiniu);
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