import React from 'react';
import TagRow from './TagRow';
import $ from 'jquery';

const ShowMenu = ({onSearch, cities, catas, onSelectedTag, reset}) => {
  const handleClick = () => $("#tagMenu").toggleClass('slide-toggle');
  const plzResetAllOfThem = (reset) => {
    // 清空搜索框，标签，以及重置 state
    $('.input.search').val('')
    $('.tagColBoxActive').removeClass('tagColBoxActive')
    reset()
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
            placeholder="搜索 作品名称/作品标签"
          />
          <div onClick={() => {
            let text = searchText.value.trim();
            if (text) onSearch(text)
          }}>
            <span className="icon icon-right">搜索</span>
          </div>
        </section>

        <span className="tag-title">拍摄地区 | Shooting Area</span>
        <TagRow data={cities} onSelectedTag={onSelectedTag} tagRowClass="tagColBox1"/>
        <span className="tag-title">拍摄种类 | Shooting Type</span>
        <TagRow data={catas} onSelectedTag={onSelectedTag} tagRowClass="tagColBox2"/>
        <button onClick={() => plzResetAllOfThem(reset)}>重置</button>
        {/*确定实际上就是隐藏*/}
        <button onClick={handleClick}>确定</button>
      </div>
    </section>
  );
};

export default ShowMenu;
