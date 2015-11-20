var React = require('react');
var Router = require('react-router');
var History = Router.History;
var Location = Router.Location;
var Reflux = require('reflux');
var DocumentTitle = require('react-document-title');
var HamburgMenu = require('../HamburgMenu');
const $ = require('jquery');
var localStorage = require('web-storage')().localStorage;

var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var OrderActions = require('../../actions/OrderActions');
var OrderStore = require('../../stores/OrderStore');
var AlbumsStore = require('../../stores/AlbumsStore');
var AlbumsActions = require('../../actions/AlbumsActions');
var PhotographerActions = require('../../actions/PhotographerActions');
var PhotographerStore = require('../../stores/PhotographerStore');
var Toaster = require('../Toast');

import BookIntro from './WorkBookIntro';
import BookForm from './WorkBookForm';

import { BOOK_A_WORK, GET_WORK_INTRO } from '../Tools';

var BookPage = React.createClass({
  getInitialState : function () {
    return {
      albums : '',
      photographer : '',
    }
  },
  mixins : [Reflux.listenTo(UserStore,'_handleUserSotreChange'),
            Reflux.listenTo(AlbumsStore,'_handleAlbumsStoreChange'),
            Reflux.listenTo(OrderStore,'_handleOrderStoreChange'),
            Reflux.listenTo(PhotographerStore,'_handlePhotographerStoreChange'), History,Location],
  /*
    所有预约的逻辑起点在这里
    先获取当前用户
  */
  componentDidMount: function() {
    //判断是否登录
    UserActions.currentUser();
  },
  /*
    由获取当前用户动作引发至这个方法
    1.如果用户未登录，需要讲当前的路径通过pushState传入到登录页面的props.location.state,让登录界面成功后返回这个地址
    2.用户登录的情况下，通过传入的参数判断是从摄影师界面进入的预约，还是通过相册进入的预约。
    3.如果是相册预约，通过AlbumsActions.get(this.props.params.workId) 得到相册的详细信息
    4.如果是摄影师预约，通过PhotographerActions.get(this.props.params.photographerId)得到摄影师的详细信息。
    5.以上的动作引发至后面的_handleAlbumsStoreChange 和 _handlePhotographerStoreChange方法
  */
  _handleUserSotreChange: function(userData){
    console.log('userData from Store', userData);
    if(!userData.isLogin){
      this.history.replaceState({nextPage : this.props.location.pathname},'/login_page');
    }else{
      console.log(this.props.params);
      if(this.props.params.workId && this.props.params.workId != '0')
        AlbumsActions.get(this.props.params.workId);
      else if(this.props.params.photographerId){
        PhotographerActions.get(this.props.params.photographerId);
      }else{
        this.history.pushState(null,'/work');
      }
    }
  },
  /*
    订单提交成功之后，取得订单号，跳转至book_success_dialog
  */
  _handleOrderStoreChange : function(data){
    if(data.flag == 'add'){
      if(data.success){
        console.log('提交订单成功！');
        var orderID = data.order.Id;
        this.history.pushState(null,'/book_success_dialog/'+orderID);
      }else{
        this.showMessage(data.hintMessage);
      }
    }
  },
  /*
    相册获取之后，可以直接将相册里的摄影师信息一并存储到state
  */
  _handleAlbumsStoreChange: function(data){
    if(data.flag == 'get'){
      if(data.hintMessage){
        this.showMessage(data.hintMessage);
      }else{
        this.setState({albums : data.workData,photographer : data.workData.User});
      }
    }
  },
  /*
    单独获取摄影师信息。
    注意，订单已定要摄影师的id，而相册的id则不是必须
  */
  _handlePhotographerStoreChange : function(data){
    if(data.flag == 'get'){
      if(data.hintMessage){
        this.showMessage(data.hintMessage);
      }else{
        console.log(data);
        this.setState({albums : '',photographer : data.photographer.User});
      }
    }
  },
  showMessage: function (content) {
    this.refs.toast.show(content)
  },
  render: function() {
    var bookInfo = '';
    if(this.state.albums){
      bookInfo = (
        <BookIntro albums={this.state.albums} />
      );
    }else{
      if(this.state.photographer){
        bookInfo =(
          <BookIntro photographer={this.state.photographer} />
        )
      }
    }
    return (
      <DocumentTitle title="作品预约">
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            minHeight: '100%',
            backgroundImage:'url(imgs/bookPageBg.png)'
          }}
          className="bookPage">
          <Toaster ref="toast"/>
          <HamburgMenu />
          {bookInfo}
          <BookForm onSubmit={this.HandleBookWorkFormSubmit} subValue="提交订单"/>
        </div>
      </DocumentTitle>
    );
  },

  HandleBookWorkFormSubmit: function(data) {
    //相册ID
    if(this.state.albums && this.state.albums.Id)
      data.AlbumsId = this.state.albums.Id;
    //摄影师ID
    data.PhotographerId = this.state.photographer.Id;
    OrderActions.add(data);
  },
});

module.exports = BookPage;
