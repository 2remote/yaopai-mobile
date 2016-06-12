import React from 'react';

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
      padding: '5px 20px',
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
  handleMask: function () {
    this.refs.mask.style.display = 'none';
    this.setState({showTags:false});
  },
  toggle: function () {
    var status = ! this.state.showTags;
    var display = status==true?'block':'none';
    this.refs.mask.style.display = display;
    this.setState({showTags: status});
  },
  
  render: function () {
    var top = this.state.showTags ? '56px' : '-380px';
    var style = {
      tab: {
        position: 'fixed',
        width: '100%',
        boxSizing: 'border-box',
        left: 0,
        top: top,
        zIndex: '98',
        padding: '15px 0',
        background: '#000',
        color: '#fff',
        WebkitTransition:'top ease .3s',
        transition: 'top ease .3s',
        opacity: 0.95
      }
    };

    return (
      <div ref="mask" className="mask" onClick={this.handleMask} style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,.5)',
        zIndex: '10',
        display:'none',
      }}>
        <div className="tagMenu" ref="tags" style={style.tab}>
          <input type="text" />
          <span>拍摄地区 | Shooting Area</span>
          <TagRow data={this.props.cities} onSelectedTag={this.props.onSelectedTag}/>
          <span>拍摄类别 | Shooting Type</span>
          <TagRow data={this.props.catas} onSelectedTag={this.props.onSelectedTag}/>
        </div>
      </div>

    );
  }
});
export {TagMenu as default};