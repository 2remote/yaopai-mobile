var React = require('react');

var TagCol = React.createClass({
  getInitialState: function () {
    return {
      clicked: false
    }
  },

  handleClick: function () {
    this.setState({clicked: !this.state.clicked});
  },
  
  render: function () {

    var style = {
      display: 'inline-block',
      margin: '20px',
      fontSize: 18,
      color: this.state.clicked ? 'yellow' :'gray'
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
      tagNodes = this.props.data.map(function(tag, i){
        if(tag.Display){
          return (
            <TagCol name={tag.Name} key={i} id={tag.Id} />
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
        <TagRow data={this.props.cities}/>
        <TagRow data={this.props.catas}/>
      </div>
    );
  }
});
module.exports = TagMenu;