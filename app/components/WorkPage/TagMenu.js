import React from 'react';

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
  getInitialState: function () {
    return {
      clicked: false
    }
  },

  handleClick: function () {
    this.setState({clicked: !this.state.clicked});
    var tag = this.props.id;
    this.props.onSelectedTag(tag);
  },

  render: function () {
    var border_color = this.state.clicked ? 'gray' :'rgba(255,255,255,.1)';
    var style = {
      display: 'inline-block',
      padding: '5px 25px',
      margin: '5px',
      fontSize: 12,
      borderRadius: '20px',
      border:'1px solid ' + border_color,
    };

    return (
      <div className="tagColBox"
        style={style}
        onClick={this.handleClick}  >
        {this.props.name}
      </div>
    );
  }
});

var TagRow = React.createClass({

  render: function () {
    var style={
      overflow: 'hidden',

    };

    var tagNodes = (<div />);
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
      <div className="tagRowBox" style={style}>
        {tagNodes}
      </div>
    );
  }
});

var TagMenu = React.createClass({
  getInitialState: function () {
    return {
      showTags: false
    }
  },

  toggle: function () {
    var status = ! this.state.showTags;
    this.setState({showTags: status});
  },

  render: function () {
    var top = this.state.showTags ? 56 : '-340px';
    var style = {
      tab: {
        position: 'fixed',
        width: '100%',
        boxSizing: 'border-box',
        left: 0,
        top: top,
        zIndex: '1000',
        padding: '15px 0',
        background: '#000',
        color: '#fff',
        WebkitTransition:'top ease .5s',
        transition: 'top ease .5s',
        opacity: 0.95
      }
    };

    return (
      <div className="tagMenu" style={style.tab}>
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
