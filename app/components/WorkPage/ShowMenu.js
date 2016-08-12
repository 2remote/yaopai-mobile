import React from 'react'
import TagRow from './TagRow'
import $ from 'jquery'
import _ from 'underscore'

const ShowMenu = (args) => {

  const {tags, onSearch, onSelectedTag, reset, searchKey, selectedTags} = args
  let searchText

  const handleClick = (tagId, onSelectedTag) => {
    $('#' + tagId).removeClass('tagColBoxActive')
    onSelectedTag()
  }
  // 我的选择
  let myChoices
  const intSelectedTags = selectedTags.map((x) => parseInt(x))
  if (tags != 'undefined') {
    myChoices = tags.map((data, i) => {
      return (
        data.Tags.map((tag, i) => {
          if (_.contains(intSelectedTags, tag.Id)) {
            return (
              <div onClick={() => handleClick(tag.Id, onSelectedTag)}>
                {tag.Name}
              </div>
            )
          }
        })
      )
    })
  }

  const toggleMenu = () => {
    $("#tagMenu").toggleClass('slide-toggle')
    $("#queryIcon").toggleClass('rotateX180deg')
    $('body').toggleClass('overflowHidden')
    $('.tagBtnLabel').toggle()
  }
  const toggleTagRow = (i) => $(".tagRowBox" + i).toggleClass('showTagRowBox')
  const plzResetAllOfThem = () => {
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
        <span className="tagBtnLabel">立即</span>筛选
        <div id="queryIcon">
          <i className="icon down" />
        </div>
      </div>

      <div className="tagMenu" id="tagMenu" style={{height: window.innerHeight}}>

        {/*搜索框*/}
        <section className="input-group-light">
          <span className="icon search search-icon icon-left"></span>
          <input
            className="input input-block search"
            ref={node => searchText = node}
            type="text"
            onBlur={searchReadyGo}
            placeholder={searchKey || "搜索 作品/标签/摄影师昵称"} />
          <span className="cancel-search" onClick={cancle}>取消</span>
        </section>

        <div className="title">
          我的选择
          <span className="reset" onClick={plzResetAllOfThem}>清除</span>
        </div>

        {myChoices}

        <div className="title">
          筛选条件
        </div>

        {tagRows}

      </div>


    </section>
  )
}

export default ShowMenu
