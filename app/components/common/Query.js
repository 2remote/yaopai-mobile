import React from 'react';
import TagRow from '../WorkPage/TagRow';
import $ from 'jquery';
import { Link } from 'react-router'

const Query = (args) => {
  const {tagType, onSearch, onSelectedTag, reset, searchKey} = args
  const handleClick = () => $("#tagMenu").toggleClass('slide-toggle');
  const plzResetAllOfThem = (reset) => {
    // 清空搜索框，标签，以及重置 state
    searchText.value = ''
    $('.tagColBoxActive').removeClass('tagColBoxActive')
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
      <Link to={"/query"} >
      <div className="tagBtn" onClick={handleClick}>
        筛选 <i className="icon down" />
      </div>
      </Link>

      <div className="tagMenu" id="tagMenu">
        <section className="input-group-light">
          <span className="icon search search-icon icon-left"></span>
          <input
            className="input input-block search"
            ref={node => searchText = node}
            type="text"
            placeholder={searchKey || "搜索 作品/标签/摄影师昵称"}
            onChange={searchReadyGo} />
          <span className="cancel-search">取消</span>
        </section>

        <span className="tag-title">拍摄地区 | PLACE</span>
        <TagRow data={tagType[1] || []} args={args} tagRowClass="tagColBox1"/>
        <span className="tag-title">拍摄种类 | CATEGORY</span>
        <TagRow data={tagType[0] || []} args={args} tagRowClass="tagColBox2"/>
        <div className="tagButton">
          {/*<button className="plzResetAllOfThem" onClick={() => plzResetAllOfThem(reset)}>重置</button>*/}
          {/*确定实际上就是隐藏*/}
          <button className="yesImPretySure" onClick={handleClick}>立即筛选</button>
        </div>
      </div>
    </section>
  );
};

export default Query;
