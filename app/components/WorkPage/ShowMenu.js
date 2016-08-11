import React from 'react'
import TagRow from './TagRow'
import $ from 'jquery'

const ShowMenu = (args) => {

  const {tags, onSearch, onSelectedTag, reset, searchKey} = args
  let searchText

  const toggleMenu = () => {
    $("#tagMenu, .tagButton").toggleClass('slide-toggle')
    $("#queryIcon").toggleClass('rotateX180deg')
    $('body').toggleClass('overflowHidden')
  }
  const toggleTagRow = (i) => $(".tagRowBox" + i).toggleClass('showTagRowBox')
  const plzResetAllOfThem = (reset) => {
    // 清空搜索框，标签，以及重置 state
    searchText.value = ''
    $('.tagColBoxActive').removeClass('tagColBoxActive')
    reset()
  }
  const searchReadyGo = () => {
    let text = searchText.value.trim()
    onSearch(text)
    $('.tagButton').delay( 950 ).fadeIn( 150 )
  }
  const cancle = () => searchText.value = ""

  let tagRows
  if (tags) {
    tagRows = tags.map((tag, i) => {
      if (tag.Display) {
        return (
          <div key={i}>
            <span className="tag-title" onClick={() => toggleTagRow(i)}>
              {tag.Name}
              <i className="icon down tag-titile-button" />
            </span>

            <TagRow
              data={tag.Tags || []}
              args={args}
              i={i} />
          </div>
        )
      }
    })
  }

  return (
    <section className="tagBox">
      <div className="tagLogo icon yaopainew" />
      <div className="tagBtn" onClick={toggleMenu}>
        筛选
        <div id="queryIcon">
          <i className="icon down" />
        </div>
      </div>

      <div className="tagMenu" id="tagMenu" style={{height: window.innerHeight-99}}>

        {/*搜索框*/}
        <section className="input-group-light">
          <span className="icon search search-icon icon-left"></span>
          <input
            className="input input-block search"
            ref={node => searchText = node}
            type="text"
            onBlur={searchReadyGo}
            onClick={() => $('.tagButton').hide()}
            placeholder={searchKey || "搜索 作品/标签/摄影师昵称"} />
          <span className="cancel-search" onClick={cancle}>取消</span>
        </section>

        <div className="title">
          筛选条件
        </div>
        {tagRows}

      </div>

      <div className="tagButton">
        <button className="yesImPretySure" onClick={toggleMenu}>立即筛选</button>
      </div>
    </section>
  )
}

export default ShowMenu
