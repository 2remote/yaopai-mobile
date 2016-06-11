import React from 'react';
import TagRow from './TagRow';
import $ from 'jquery';

const ShowMenu = ({onSearch, cities, catas, onSelectedTag}) => {
  const handleClick = () => $("#tagMenu").slideToggle();
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
            className="input input-block"
            ref={node => searchText = node}
            type="text"
            placeholder="找不到想要的？试着搜一下！"
          />
          <div onClick={() => {
            let text = searchText.value.trim();
            if (text) onSearch(text)
          }}>
            <span className="icon icon-right phone">搜索</span>
          </div>
        </section>

        <span className="tag-title">拍摄地区 | Shooting Area</span>
        <TagRow data={cities} onSelectedTag={onSelectedTag}/>
        <span className="tag-title">拍摄种类 | Shooting Type</span>
        <TagRow data={catas} onSelectedTag={onSelectedTag}/>
      </div>
    </section>
  );
};

export default ShowMenu;
