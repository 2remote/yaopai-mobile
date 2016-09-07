/**
 * Created by zoey on 2015/11/28.
 * 滚动刷新 mixin 没注释 差评
 */
import { findDOMNode } from 'react-dom'

var AutoLoadPageMixin = {
  componentDidMount: function() {
    window.addEventListener('scroll', this.onWindowScroll)
    window.addEventListener('resize', this.onWindowScroll)
  },
  componentDidUpdate: function() {
    window.addEventListener('scroll', this.onWindowScroll)
    window.addEventListener('resize', this.onWindowScroll)
  },
  onWindowScroll : function () {
    const bounds = findDOMNode(this).getBoundingClientRect()
    const scrollTop = window.pageYOffset
    const top = bounds.top + scrollTop
    const height = bounds.bottom - bounds.top
    if (scrollTop > 0 && height - scrollTop < window.screen.height) {
      this.onNext()
    }
  },
  onNext : function() {
    var pageIndex = this.state.pageIndex + 1
    if(this.state.pageCount != 0 && this.state.pageCount <= pageIndex){
      window.removeEventListener('scroll', this.onWindowScroll)
      window.removeEventListener('resize', this.onWindowScroll)
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
    setTimeout(this.onHideToast, 2000)
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
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onWindowScroll)
    window.removeEventListener('resize', this.onWindowScroll)
  }
}

export {AutoLoadPageMixin as default}
