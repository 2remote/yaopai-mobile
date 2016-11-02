import React from 'react'
import { History, Location } from 'react-router'
import Reflux from 'reflux'
import API from '../../../../../api'
import DocumentTitle from 'react-document-title'

import UserActions from '../../../../../actions/UserActions'
import UserStore from '../../../../../stores/UserStore'
import OrderActions from '../../../../../actions/OrderActions'
import OrderStore from '../../../../../stores/OrderStore'
import AlbumsStore from '../../../../../stores/AlbumsStore'
import AlbumsActions from '../../../../../actions/AlbumsActions'
import PhotographerActions from '../../../../../actions/PhotographerActions'
import PhotographerStore from '../../../../../stores/PhotographerStore'
import Toaster from '../../../../Toast'

import BookIntro from './BookIntro'
import BookForm from './BookForm'

import Browser from '../../../../Browser'

const BookPage = React.createClass({
  getInitialState : function () {
    return {
      albums : '',
      photographer : '',
      lock: true
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
    UserActions.currentUser()
  },
  /*
    由获取当前用户动作引发至这个方法
    1.如果用户未登录，需要讲当前的路径通过pushState传入到登录页面的props.location.state,让登录界面成功后返回这个地址
    2.用户登录的情况下，通过传入的参数判断是从摄影师界面(已经废除)进入的预约，还是通过相册进入的预约。
    3.如果是相册预约，通过AlbumsActions.get(this.props.params.workId) 得到相册的详细信息
    4.如果是摄影师预约，通过PhotographerActions.get(this.props.params.photographerId)得到摄影师的详细信息。(已经废除)
    5.以上的动作引发至后面的_handleAlbumsStoreChange 和 _handlePhotographerStoreChange方法
  */
  _handleUserSotreChange: function(userData){
    if(!userData.isLogin){
      if (!this.state.lock) return
      const confirmLogin = confirm("是否前往登录，然后继续预约？")
      if (confirmLogin) {
        this.props.history.pushState({nextPage : this.props.location.pathname},'/login_page')
      } else {
        this.setState({
          lock : false
        })
        this.props.history.goBack()
      }

    } else if (userData.userType == 1) {
      alert('摄影师目前不能预约！')
      this.props.history.goBack()
    }else{
      if(this.props.params.workId && this.props.params.workId != '0')
        AlbumsActions.get(this.props.params.workId)
      else if(this.props.params.photographerId){
        PhotographerActions.get(this.props.params.photographerId)
      }else{
        this.history.pushState(null,'/work')
      }
    }
  },
  /*
    订单提交成功之后，取得订单号，跳转至订单详情
  */
  _handleOrderStoreChange : function(data){
    if(data.flag == 'add'){
      if(data.success){
<<<<<<< HEAD
        var orderID = data.order.Id
        const ua = navigator.userAgent.toLowerCase() //获取判断浏览器用的对象
        if (ua.match(/MicroMessenger/i) != "micromessenger") {
          alert('预约成功！由于微信限制，请在 Safari 浏览器里打开本网页，再进行支付操作')
          return
        }
=======
        let orderID = data.order.Id
>>>>>>> parent of 74d3043... Revert "解决支付平台冲突 (#628)"
        this.showMessage("预约成功！")
        const orderId = data.order.Id
        const Origin = location.origin
        const callBackUrl = encodeURIComponent(`${Origin}/#/center/u/order/${orderId}`)
<<<<<<< HEAD
        location.href = `http:${API.ORDER.wexinRedirect}=${callBackUrl}`
=======

        // 如果是在微信内部，就微信授权获得微信支付所需的东西，否则就直接跳转到支付页面，让用户支付宝支付
        if(Browser.versions.weixin) {// 如果是微信内部
          location.href = `http:${API.ORDER.wexinRedirect}=${callBackUrl}`
        } else {
          this.history.pushState(null,'/center/u/order/' + orderId)
        }
>>>>>>> parent of 74d3043... Revert "解决支付平台冲突 (#628)"
      }else{
        this.showMessage(data.hintMessage)
      }
    }
  },
  /*
    相册获取之后，可以直接将相册里的摄影师信息一并存储到state
  */
  _handleAlbumsStoreChange: function(data){
    if(data.flag == 'get'){
      if(data.hintMessage){
        this.showMessage(data.hintMessage)
      }else{
        this.setState({albums : data.workData,photographer : data.workData.User})
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
        this.showMessage(data.hintMessage)
      }else{
        this.setState({albums : '',photographer : data.photographer})
      }
    }
  },
  showMessage: function (content) {
    this.refs.toast.show(content)
  },
  render: function() {
    let bookInfo = ''
    if(this.state.albums){
      bookInfo = (
        <BookIntro albums={this.state.albums} />
      )
    }else{
      if(this.state.photographer){
        bookInfo =(
          <BookIntro photographer={this.state.photographer} />
        )
      }
    }
    return (
      <DocumentTitle title="作品预约">
        <div>
          <Toaster ref="toast"/>
          {bookInfo}
          <BookForm onSubmit={this.HandleBookWorkFormSubmit} subValue="立即预约"/>
        </div>
      </DocumentTitle>
    )
  },

  HandleBookWorkFormSubmit: function(data) {
    //相册ID
    if(this.state.albums && this.state.albums.Id)
      data.AlbumsId = this.state.albums.Id
    //摄影师ID
    data.PhotographerId = this.state.albums.Photographer.Id
    OrderActions.add(data)
  }
})

export {BookPage as default}
