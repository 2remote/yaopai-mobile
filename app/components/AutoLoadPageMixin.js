/*
 * 滚动刷新 mixin， list 如果滚动到底部了，就请求下一页的数据
 * 滚动到底部时请求下一页数据
 * 注意 bind(this) 的坑
 */
import $ from 'jquery'

let pageIndex = 1
const AutoLoadPageMixin = {
  // 监听滚动事件
  componentDidMount() {
    const self = this
    $(window).scroll(() => {
      const scrollTop = $(window).scrollTop()
      const scrollHeight = $(document).height()
      const  windowHeight = $(window).height()
      if(scrollTop + windowHeight == scrollHeight){ // 当滚动到底部
        self.onNext()
      }
    })
  },

  onNext() {
    pageIndex++
    if(this.state.pageCount != 0 && this.state.pageCount <= pageIndex){
      if(this.state.pageCount < this.pageIndex){
        this.onPageEnd()
        return
      }
    }
    this.onChangePage(pageIndex)
  },
  onPageEnd(){
    this.onShowToast('没有更多了')
    setTimeout(this.onHideToast.bind(this), 1000)
  },
  onShowToast(content) {
    if(this.refs.toast){
      this.refs.toast.show(content)
    }
  },
  onHideToast(content) {
    if(this.refs.toast){
      this.refs.toast.hide()
    }
  },
  componentWillUnmount() { // 取消绑定
    pageIndex = 1
  }
}

export default AutoLoadPageMixin
