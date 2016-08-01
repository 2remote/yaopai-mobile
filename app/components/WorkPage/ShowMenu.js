import React from 'react'
import TagRow from './TagRow'
import $ from 'jquery'
import { Link } from 'react-router'

const ShowMenu = (args) => {

  const {tags, onSearch, onSelectedTag, reset, searchKey} = args
  let searchText

  const toggleMenu = () => {
    $("#tagMenu, .tagButton").toggleClass('slide-toggle')
    $("#queryIcon").toggleClass('rotateX180deg')
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
  const cancle = () => searchText.value = ""

  let tagRows
  if (tags) {
    tagRows = tags.map((tag, i) => {
      console.warn(tag);
      if (tag.Display) {
        return (
          <div key={i}>
            <span className="tag-title">{tag.Name}</span>
            <TagRow
              data={tag.Tags || []}
              args={args}
              tagRowClass={"tagColBox" + i} />
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
        <section className="input-group-light">
          <span className="icon search search-icon icon-left"></span>
          <input
            className="input input-block search"
            ref={node => searchText = node}
            type="text"
            onBlur={searchReadyGo}
            placeholder={searchText || "搜索 作品/标签/摄影师昵称"} />
          <span className="cancel-search" onClick={cancle}>取消</span>
        </section>

        {tagRows}
        
      </div>

      <div className="tagButton">
        <button className="yesImPretySure" onClick={toggleMenu}>立即筛选</button>
      </div>
    </section>
  )
}

export default ShowMenu
