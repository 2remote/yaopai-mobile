import React from 'react'
import TagRow from './TagRow'
import PriceTag from './PriceTag'
import MyChoices from './MyChoices'
import $ from 'jquery'

const ShowMenu = (args) => {

  const {tags, priceTag, onSearch, onSelectedTag, onPriceTag, reset, searchKey, selectedTags} = args
  let searchText

  const toggleMenu = () => {
    $("#tagMenu").toggleClass('slide-toggle')
    $("#queryIcon").toggleClass('rotateX180deg')
    $('body').toggleClass('overflowHidden')
    $('.tagBtnLabel').toggle()
  }
  const toggleTagRow = (i) => $(".tagRowBox" + i).toggleClass('showTagRowBox')
  const searchReadyGo = () => {
    let text = searchText.value.trim()
    onSearch(text)
  }
  const cancle = () => {
    searchText.value = ""
    searchReadyGo()
  }

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

      <div className="tagMenu" id="tagMenu" style={{height: window.innerHeight-49}}>

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

        <MyChoices args={args}/>

        <div className="title">
          筛选条件
        </div>

        {/*价格筛选*/}
        <PriceTag priceTag={priceTag} onPriceTag={onPriceTag}/>

        {tagRows}

      </div>


    </section>
  )
}

export default ShowMenu
