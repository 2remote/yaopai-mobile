import React from 'react'
import $ from 'jquery'

const ShowMenu = (args) => {

  const { onSearch, reset, searchKey} = args
  let searchText

  const toggleMenu = () => {
    $("#tagMenu").toggleClass('slide-toggle')
    $("#queryIcon").toggleClass('rotateX180deg')
    $('body').toggleClass('overflowHidden')
    $('.tagBtnLabel').toggle()
  }
  const plzResetAllOfThem = (reset) => {
    // 清空搜索框，标签，以及重置 state
    searchText.value = ''
    $('.tagColBoxActive').removeClass('tagColBoxActive')
    reset()
  }
  const searchReadyGo = () => {
    let text = searchText.value.trim()
    onSearch(text)
  }
  const cancle = () => {
    searchText.value = ""
    searchReadyGo()
  }

  return (
    <section className="tagBox">
      <div className="tagLogo icon yaopainew" />
      <div className="tagBtn" onClick={toggleMenu}>
        <span className="tagBtnLabel">立即</span>搜索
        <div id="queryIcon">
          <i className="icon down" />
        </div>
      </div>

      <div className="tagMenu" id="tagMenu" style={{height: window.innerHeight}}>
        <section className="input-group-light">
          <span className="icon search search-icon icon-left"></span>
          <input
            className="input input-block search"
            ref={node => searchText = node}
            type="text"
            onBlur={searchReadyGo}
            placeholder={searchText || "搜索 摄影师昵称/地区"} />
          <span className="cancel-search" onClick={cancle}>取消</span>
        </section>

      </div>

    </section>
  )
}

export default ShowMenu
