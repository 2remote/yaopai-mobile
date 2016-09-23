import React from 'react'
import $ from 'jquery'

const OrderSearchBar = ({onSearch}) => {
  const onSearchFocus = () => $('#search_bar').addClass('weui_search_focusing')

  const clearText = () => $('#search_input').val('')

  const onSearchSubmit = e => {
    e.preventDefault()
    let searchText = $('#search_input').val().trim()
    onSearch(searchText)
  }

  const closeSearch = () => {
    $('#search_bar').removeClass('weui_search_focusing')
    onSearch('')
  }

  return (
    <div className="weui_search_bar" id="search_bar" style={{position: 'absolute', width: '100%', top: '48'}}>
      <form className="weui_search_outer" onSubmit={onSearchSubmit}>
        <div className="weui_search_inner">
          <i className="weui_icon_search" />
          <input
            type="search"
            className="weui_search_input"
            id="search_input"
            placeholder="输入订单联系人，搜索所有订单"
            onFocus={onSearchFocus}
            required
          />
        <a href="javascript:" onClick={clearText} className="weui_icon_clear" id="search_clear" />
        </div>
        <label htmlFor="search_input" className="weui_search_text" id="search_text">
          <i className="weui_icon_search" />
          <span>输入订单联系人，搜索所有订单</span>
        </label>
      </form>
      <a onClick={closeSearch} href="javascript:" className="weui_search_cancel" id="search_cancel">
        取消
      </a>
    </div>
  )
}

export default OrderSearchBar
