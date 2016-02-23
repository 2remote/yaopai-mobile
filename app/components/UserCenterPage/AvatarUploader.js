var React = require ('react');
var API = require('../../api');

var AvatarUploader = React.createClass({
  getInitialState : function(){
    return {
      imageUrl : '',
      progress : 0,
      uploaderOption : {
        runtimes: 'html5,flash,html4',
        browse_button: '',
        max_file_size: '10mb',
        dragdrop: false,
        chunk_size: '4mb',
        uptoken_url: API.FILE.user_token_url,
        domain: 'http://qiniu-plupload.qiniudn.com/',
        auto_start: true,
        get_new_uptoken: true,
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
      disabled : false,
      defaultImage : 'img/tianjia.png', //指定未上传时的图片
      colWidth : 'col-xs-4',  //指定所占列宽
      width : '80',  //图片高度
      height : '80', //指定图片高度
      type : '',  //必须指定图片类型 user, work...
      uid : 'imagePick', //当一个页面引用了多个AvatarUploader，必须指定不同的uid
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
  getValue : function(){
    return this.props.defaultImage;
  },

  componentDidMount : function() {
    var self = this;
    if(!this.props.disabled){
      this.state.uploaderOption.browse_button = this.props.uid;
      var uploaderOption = this.state.uploaderOption;
      uploaderOption.init.FileUploaded = this.onFileUploaded;
      uploaderOption.init.UploadProgress = this.onUploadProgress;
      Qiniu.uploader(uploaderOption);
    }
  },
  parseImageUrl :function(url){
    url = url + '?imageMogr2/gravity/Center'
    if(this.props.width && this.props.height){
      url = url + '/thumbnail/!'+this.props.width+'x'+this.props.height+'r'; //限制短边
      url = url + '/crop/'+this.props.width + 'x' + this.props.height; //剪裁
    }
    if(this.props.width && !this.props.height){
      url = url + '/thumbnail/'+this.props.width+'x'; //只缩放宽度,不剪裁
    }
    if(this.props.height && !this.props.width){
      url = url + '/thumbnail/x'+this.props.height; //只缩放高度,不剪裁
    }
    url = url + '/interface/1'; //渐进
    return url;
  },
  render : function (){
    var imgStyle ={
      cursor : 'pointer',
      borderRadius : this.props.circle?'50%':'0'
    };
    var noStyle = {
      borderRadius : this.props.circle?'50%':'0'
    };
    var hide = {
      display : 'none'
    }

    return (
      <div style={this.props.addStyle} className={this.props.colWidth}>
        <div style={this.props.disabled?hide:{}}>
          <img id={this.props.uid}
            style={this.props.disabled? hide : imgStyle}
            width={this.props.width}
            height={this.props.height}
            src={this.parseImageUrl(this.props.defaultImage)} />
        </div>
        <div style={this.props.disabled? {} : hide}>
          <img
            style={this.props.disabled? noStyle : hide}
            width={this.props.width}
            height={this.props.height}
            src={this.parseImageUrl(this.props.defaultImage)} />
        </div>
      </div>
    );
  }
});

module.exports = AvatarUploader;