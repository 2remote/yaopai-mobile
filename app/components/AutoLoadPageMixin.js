/**
 * Created by zoey on 2015/11/28.

 * Changeed by zaxlct on 2016/09/09.
 * 滚动刷新 mixin， list 如果滚动到底部了，就请求下一页的数据
 * 滚动到底部时请求下一页数据
 * 注意 bind(this) 的坑
 */
import $ from 'jquery'

let nScrollHight = 0 //滚动距离总长(注意不是滚动条的长度)
let nScrollTop = 0   //滚动到的当前位置
let type

const AutoLoadPageMixin = {
  // 监听滚动事件
  componentDidMount: function() {
    let node = window
    type = this.state.componentName
    if(this.state.componentName == 'OrderListLayout') { // 判断是 OrderListLayout 组件 还是 WorkPage 组件
      node = this.refs.orderListContainer
    }
    node.addEventListener('scroll', this.onWindowScroll.bind(this))
    node.addEventListener('resize', this.onWindowScroll.bind(this))
  },

  onWindowScroll : function () {
    if(type !== this.state.componentName) return
    let bounds // 拿到 ClientRect 对象
    if(this.state.componentName == 'OrderListLayout') { // 判断是 OrderListLayout 组件 还是 WorkPage 组件
      bounds = this.refs.orderList.getBoundingClientRect()
    } else {
      bounds = this.refs.workpage.getBoundingClientRect()
    }

    const scrollTop = window.pageYOffset
    const top = bounds.top + scrollTop
    const height = bounds.bottom - bounds.top
    // 判断 workList 是否滚动到底部
    if(this.state.componentName != 'OrderListLayout') {
      if (scrollTop > 0 && height - scrollTop < window.screen.height) this.onNext()
    } else {
      // 判断 orderList 是否滚动到底部
      const node = this.refs.orderListContainer
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
    let pageIndex = this.state.pageIndex + 1
    if(this.state.pageCount != 0 && this.state.pageCount <= pageIndex){
      let node = window
      if(this.state.componentName == 'OrderListLayout') node = this.refs.orderListContainer
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
      node = this.refs.orderListContainer
    }
    node.removeEventListener('scroll', this.onWindowScroll)
    node.removeEventListener('resize', this.onWindowScroll)
  }
}

export default AutoLoadPageMixin
