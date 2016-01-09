var React = require('react');

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
    var border_color = this.state.clicked ? 'gray' :'black';
    var style = {
      display: 'inline-block',
      padding: '5px 10px 5px 10px',
      margin: '5px',
      fontSize: 18,
      borderRadius: '4px',
      border: '1px solid ' + border_color
    };

    return (      
      <div className="tagColBox" 
        style={style}
        onClick={this.handleClick}  >
        {this.props.name}.{this.props.id}
      </div>
    );
  }
});

var TagRow = React.createClass({

  
  render: function () {
    var style={
      overflow: 'scroll'
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
    var top = this.state.showTags ? 70: '-340px';
    var style = {
      tab: {
        position: 'fixed',
        width: '100%',
        boxSizing: 'border-box',
        left: 0,
        top: top,
        zIndex: '0',
        padding: '27px 0 19px',
        background: '#000',
        color: '#fff',
        WebkitTransition:'top ease .5s',
        transition: 'top ease .5s',
      }
    };

    return (
      <div className="tagMenu" style={style.tab}>
        <TagRow data={this.props.cities} onSelectedTag={this.props.onSelectedTag}/>
        <TagRow data={this.props.catas} onSelectedTag={this.props.onSelectedTag}/>
      </div>
    );
  }
});
module.exports = TagMenu;