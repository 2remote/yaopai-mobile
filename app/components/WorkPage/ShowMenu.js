import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';
import TagMenu from './TagMenu';

var ShowMenu = React.createClass({
  handleClick: function () {
    this.refs.tagMenu.toggle();
  },
  render() {
    return (
      <section className="tagBox">
        <div className="tagLogo icon yaopainew" />
        <div className="tagBtn" onClick={this.handleClick}>
          筛选 <i className="icon down" />
        </div>
        <TagMenu
          ref="tagMenu"
          cities={this.props.cities}
          catas={this.props.catas}
          onSelectedTag={this.props.onSelectedTag}
          onSearch = {this.props.onSearch}
        />
      </section>
    );
  }
});

export {ShowMenu as default};
