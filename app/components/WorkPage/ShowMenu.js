import React from 'react';
import TagRow from './TagRow';
import $ from 'jquery';

const ShowMenu = (args) => {
  const {onSearch, cities, catas, onSelectedTag, reset, searchKey} = args
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
      <div className="tagBtn" onClick={handleClick}>
        筛选 <i className="icon down" />
      </div>

      <div className="tagMenu" id="tagMenu">
        <section className="input-group-dark">
          <input
            className="input input-block search"
            ref={node => searchText = node}
            type="text"
            placeholder={searchKey || "搜索 作品名称/作品标签"}
            onChange={searchReadyGo}
          />
        <div onClick={searchReadyGo}>
          <span className="icon search search-icon icon-right"></span>
          </div>
        </section>

        <span className="tag-title">拍摄地区 | Shooting Area</span>
        <TagRow data={cities} args={args} tagRowClass="tagColBox1"/>
        <span className="tag-title">拍摄种类 | Shooting Type</span>
        <TagRow data={catas} args={args} tagRowClass="tagColBox2"/>
        <div className="tagButton">
          <button className="plzResetAllOfThem" onClick={() => plzResetAllOfThem(reset)}>重置</button>
          {/*确定实际上就是隐藏*/}
          <button className="yesImPretySure" onClick={handleClick}>确定</button>
        </div>
      </div>
    </section>
  );
};

export default ShowMenu;
