import React from 'react';
import TagRow from './TagRow';
import $ from 'jquery';

var ShowMenu = React.createClass({
  handleClick() {
    $("#tagMenu").slideToggle();
  },
  render() {
    return (
      <section className="tagBox">
        <div className="tagLogo icon yaopainew" />
        <div className="tagBtn" onClick={this.handleClick}>
          筛选 <i className="icon down" />
        </div>

        <div className="tagMenu" id="tagMenu">
          <div>
            <input
              type="text"
              placeholder="找不到想要的？试着搜一下！"
              ref="search"
            />
            { /* button 改成 icon */ }
            <button onClick={event => {
              event.preventDefault();
              let text = this.refs.search.value.trim();
              if (text) this.props.onSearch(text)
            }}>
              搜索
            </button>
          </div>

          <span>拍摄地区 | Shooting Area</span>
          <TagRow data={this.props.cities} onSelectedTag={this.props.onSelectedTag}/>
          <span>拍摄种类 | Shooting Type</span>
          <TagRow data={this.props.catas} onSelectedTag={this.props.onSelectedTag}/>
        </div>
      </section>
    );
  }
});

export default ShowMenu;
