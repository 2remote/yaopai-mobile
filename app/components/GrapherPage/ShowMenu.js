import React from 'react'
import $ from 'jquery'

const ShowMenu = (args) => {
  const {onSearch, reset, searchKey} = args
  const handleClick = () => $("#tagMenu").toggleClass('slide-toggle');
  const plzResetAllOfThem = (reset) => {
    // 清空搜索框，标签，以及重置 state
    searchText.value = ''
    reset()
  }
  const searchReadyGo = () => {
    let text = searchText.value.trim();
    text && onSearch(text)
  }
  let searchText;
  return (
    <section className="tagBox">
      <div className="tagLogo icon yaopainew" />
<<<<<<< HEAD
      {/*<div className="tagBtn" onClick={handleClick}>
        筛选 <i className="icon down" />
      </div> */}
=======
      <div className="tagBtn" onClick={handleClick}>
        搜索 <i className="icon down" />
      </div>
>>>>>>> dev

      <div className="tagMenu" id="tagMenu">
        <section className="input-group-dark">
          <input
            className="input input-block search"
            ref={node => searchText = node}
            type="text"
            placeholder={searchKey || "搜索 摄影师昵称"}
            onChange={searchReadyGo}
          />
<<<<<<< HEAD
          <div onClick={() => {
            let text = searchText.value.trim();
            if (text) onSearch(text)
          }}>
            <span className="icon search icon-right"></span>
=======
        <div onClick={searchReadyGo}>
          <span className="icon search search-icon icon-right"></span>
>>>>>>> dev
          </div>
        </section>

        <div className="tagButton">
          <button className="plzResetAllOfThem" onClick={() => plzResetAllOfThem(reset)}>重置</button>
          {/*确定实际上就是隐藏*/}
          <button className="yesImPretySure" onClick={handleClick}>确定</button>
        </div>
      </div>
    </section>
  )
}

export default ShowMenu
