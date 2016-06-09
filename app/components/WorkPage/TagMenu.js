import React from 'react';
import $ from 'jquery';

class SearchRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleClick() {
    this.props.onSearch(this.state.value)
  }
  render() {
    return (
      <div>
        <input type="text"
          ref
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleClick.bind(this)}>搜索</button>
      </div>
    )
  }
}

var TagCol = React.createClass({
  handleClick() {
    $("#tagColBox").toggleClass('tagColBoxActive');
    var tag = this.props.id;
    this.props.onSelectedTag(tag);
  },

  render() {
    return (
      <div
        className="tagColBox"
        id="tagColBox"
        onClick={this.handleClick}
      >
        {this.props.name}
      </div>
    );
  }
});

var TagRow = React.createClass({
  render() {
    var tagNodes = <div />;
    if (typeof this.props.data != 'undefined'){
      var onSelectedTag = this.props.onSelectedTag;
      tagNodes = this.props.data.map(function(tag, i){
        if(tag.Display){
          return (
            <TagCol name={tag.Name} key={i} id={tag.Id} onSelectedTag={onSelectedTag} />
          );
        }
      });
    }

    return (
      <div className="tagRowBox">
        {tagNodes}
      </div>
    );
  }
});

var TagMenu = React.createClass({
  toggle() {
    $("#tagMenu").slideToggle();
  },

  render() {
    return (
      <div className="tagMenu" id="tagMenu">
        <SearchRow onSearch = {this.props.onSearch}/>
        <span>拍摄地区 | Shooting Area</span>
        <TagRow data={this.props.cities} onSelectedTag={this.props.onSelectedTag}/>
        <span>拍摄种类 | Shooting Type</span>
        <TagRow data={this.props.catas} onSelectedTag={this.props.onSelectedTag}/>
      </div>
    );
  }
});
export {TagMenu as default};
