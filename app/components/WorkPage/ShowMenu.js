import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';
import TagMenu from './TagMenu';

var ShowMenu = React.createClass({
  getInitialState: function () {
    return {
      showState: false
    }
  },
  handleClick: function () {
    this.refs.tagMenu.toggle();
    this.setState({showState: !this.state.showState});
  },
  render: function () {

    var style = {
      position: 'fixed',
      top: 5,
      right: '22px',
      zIndex: '99',
    };

    return (
      <section>
        <div style={style} onClick={this.handleClick}>
          筛选<i
            className="icon down"
            style={{fontSize:25, color: 'black'}} />
        </div>
        <TagMenu ref="tagMenu"
          cities={this.props.cities}
          catas={this.props.catas}
          onSelectedTag={this.props.onSelectedTag}
          onSearch = {this.props.onSearch} />
      </section>
    );
  }
});

export {ShowMenu as default};
