/**
 * Created by zoey on 2015/11/28.

 * Changeed by zaxlct on 2016/09/09.
 * 滚动刷新 mixin， list 如果滚动到底部了，就请求下一页的数据
 * 滚动到底部时请求下一页数据
 * 注意 bind(this) 的坑
 */
import { findDOMNode } from 'react-dom'
import $ from 'jquery'
var nScrollHight = 0 //滚动距离总长(注意不是滚动条的长度)
var nScrollTop = 0   //滚动到的当前位置

var AutoLoadPageMixin = {
  // 监听滚动事件
  componentDidMount: function() {
    if(this.state.componentName == 'OrderListLayout') { // 判断是 OrderListLayout 组件 还是 WorkPage 组件
      let node = $('#orderListContainer').get(0)
      node.addEventListener('scroll', this.onWindowScroll.bind(this))
      node.addEventListener('resize', this.onWindowScroll.bind(this))
    } else if (this.state.componentName == 'makeupArtistWorkPage') {
      window.addEventListener('scroll', this.onWindowScroll.bind(this))
      window.addEventListener('resize', this.onWindowScroll.bind(this))
    } else {
      window.addEventListener('scroll', this.onWindowScroll)
      window.addEventListener('resize', this.onWindowScroll)
    }
  },
  componentDidUpdate: function() {
    if(this.state.componentName == 'OrderListLayout') { // 判断是 OrderListLayout 组件 还是 WorkPage 组件
      let node = $('#orderListContainer').get(0)
      node.addEventListener('scroll', this.onWindowScroll.bind(this))
      node.addEventListener('resize', this.onWindowScroll.bind(this))
    } else if (this.state.componentName == 'makeupArtistWorkPage') {
      window.addEventListener('scroll', this.onWindowScroll.bind(this))
      window.addEventListener('resize', this.onWindowScroll.bind(this))
    } else {
      window.addEventListener('scroll', this.onWindowScroll)
      window.addEventListener('resize', this.onWindowScroll)
    }
  },
  onWindowScroll : function () {
    let bounds // 拿到 ClientRect 对象
    if(this.state.componentName == 'OrderListLayout') { // 判断是 OrderListLayout 组件 还是 WorkPage 组件
      const $cardList = $(findDOMNode(this)).children('#orderList').get(0)
      bounds = ($cardList.getBoundingClientRect())
    } else if(this.state.componentName == 'WorkPage' || this.state.componentName == 'makeupArtistWorkPage') {
      bounds = findDOMNode(this).getBoundingClientRect()
    }
    const scrollTop = window.pageYOffset
    const top = bounds.top + scrollTop
    const height = bounds.bottom - bounds.top
    // 判断 workList 是否滚动到底部
    if(this.state.componentName == 'WorkPage' || this.state.componentName == 'makeupArtistWorkPage') {
      if (scrollTop > 0 && height - scrollTop < window.screen.height) this.onNext()

    } else if (this.state.componentName == 'OrderListLayout') {
      // 判断 orderList 是否滚动到底部
      const node = findDOMNode(this)
      const nDivHight = $(node).outerHeight()
      nScrollHight = $(node)[0].scrollHeight
      nScrollTop = $(node)[0].scrollTop

      if(nScrollTop + nDivHight >= nScrollHight) {
        // console.log("滚动条到底部了")
        // TODO 一旦滚动到底部会多次执行这个函数，不过目前还没发现问题
        this.onNext()
      }
    }
  },

  onNext : function() {
    var pageIndex = this.state.pageIndex + 1
    if(this.state.pageCount != 0 && this.state.pageCount <= pageIndex){
      let node = window
      if(this.state.componentName == 'OrderListLayout') node = $('#orderListContainer').get(0)
      node.removeEventListener('scroll', this.onWindowScroll)
      node.removeEventListener('resize', this.onWindowScroll)
      if(this.state.pageCount < pageIndex){
        this.onPageEnd()
        return
      }
    }
    this.setState({pageIndex :pageIndex })
    this.onChangePage(pageIndex)

  },
  onPageEnd : function(){
    this.onShowToast('没有更多了')
    setTimeout(this.onHideToast.bind(this), 1000)
  },
  onShowToast: function (content) {
    if(this.refs.toast){
      this.refs.toast.show(content)
    }
  },
  onHideToast: function (content) {
    if(this.refs.toast){
      this.refs.toast.hide()
    }
  },
  componentWillUnmount: function() { // 取消绑定
    let node = window
    if(this.state.componentName == 'OrderListLayout') { // 判断是 OrderListLayout 组件 还是 WorkPage 组件
      node = $('#orderListContainer').get(0)
    }
    node.removeEventListener('scroll', this.onWindowScroll)
    node.removeEventListener('resize', this.onWindowScroll)
  }
}

export {AutoLoadPageMixin as default}
