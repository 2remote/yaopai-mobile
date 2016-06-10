import React from 'react';
import $ from 'jquery';

class TagRow extends React.Component {
  handleClick(tagId, onSelectedTag) {
    $("#tagColBox").toggleClass('tagColBoxActive');
    onSelectedTag(tagId);
  }

  render() {
    var tagNodes = <div />;
    if (typeof this.props.data != 'undefined'){
      var onSelectedTag = this.props.onSelectedTag;
      tagNodes = this.props.data.map((tag, i) => {
        if(tag.Display){
          return (
            <div
              key={i}
              className="tagColBox"
              id="tagColBox"
              onClick={() => this.handleClick(tag.id, onSelectedTag)}
            >
              {tag.Name}
            </div>
          );
        }
      });
    }

    return <div className="tagRowBox">{tagNodes}</div>
  }
};

class TagMenu extends React.Component{
  toggle() {
    $("#tagMenu").slideToggle();
  }

  render() {
    return (
      <section className="tagMenu" id="tagMenu">
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
      </section>
    );
  }
};

export default TagMenu;
