import React from 'react'
import OrderListLayout from './OrderListLayout'
import WeuiNavbar from '../../../../UI/WeuiNavbar'
import { OrderStatus } from '../../../../Tools'
import OrderActions from '../../../../../actions/OrderActions'
import $ from 'jquery'

let navList = [
  {
    filterType: OrderStatus.ALL,
    text: '全部订单'
  },{
    filterType: OrderStatus.UNCONFIRMED,
    text: '待确认'
  },{
    filterType: OrderStatus.ONGOING,
    text: '进行中'
  },{
    filterType: OrderStatus.COMPLETE,
    text: '已完成'
  },{
    filterType: OrderStatus.CLOSED,
    text: '已关闭'
  }]

class OrderTabLayout extends React.Component {
  /**
   * 我也不知道为什么要把整个data传出来
   * @param data
   */
  getIndex(data) {
    OrderActions.type(data.filterType)
  }

  onSearchFocus() {
    $('#search_bar').addClass('weui_search_focusing')
  }

  clearText() {
    $('#search_input').val('')
  }

  onSearchSubmit = e => {
    e.preventDefault()
    $('#search_bar').removeClass('weui_search_focusing')
    var text = $('#search_input').val().trim()
  }
  render() {
    return (
      <div className="weui_tab">
        <WeuiNavbar list={navList} onClick={this.getIndex.bind(this)} />
        <div className="weui_search_bar" id="search_bar" style={{position: 'absolute', width: '100%', top: '48'}}>
          <form className="weui_search_outer" onSubmit={this.onSearchSubmit}>
            <div className="weui_search_inner">
              <i className="weui_icon_search" />
              <input
                type="search"
                className="weui_search_input"
                id="search_input"
                placeholder="搜索"
                onFocus={this.onSearchFocus}
                required
              />
            <a href="javascript:" onClick={this.clearText} className="weui_icon_clear" id="search_clear" />
            </div>
            <label htmlFor="search_input" className="weui_search_text" id="search_text">
              <i className="weui_icon_search" />
              <span>搜索</span>
            </label>
          </form>
          <a href="javascript:" onClick={this.onSearchBlur} className="weui_search_cancel" id="search_cancel">取消 </a>
        </div>
        <OrderListLayout location={{ pathname: this.props.location.pathname }} />
      </div>
    )
  }
}

export default OrderTabLayout

      // <!--<a href="javascript:;" class="weui_btn weui_btn_primary">点击展现searchBar</a>-->
