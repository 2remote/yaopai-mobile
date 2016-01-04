var React = require('react');

var TagCol = React.createClass({
  render: function () {
    return (
      <div className="tagColBox">
        {this.props.name}
      </div>
    );
  }
});

var TagRow = React.createClass({

  
  render: function () {
    var tagNodes = (<div />);
    if (typeof this.props.data != 'undefined'){
      tagNodes = this.props.data.map(function(tag, i){
        if(tag.Display){
          return (
            <TagCol name={tag.Name} key={i} />
          );
        }
      });
    }

    return (
      <div className="tagRowBox" >
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
    var top = this.state.showTags ? 80: '-340px';
    var style = {
      tab: {
        position: 'fixed',
        width: '100%',
        boxSizing: 'border-box',
        left: 0,
        top: top,
        zIndex: '9999',
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