var React = require('react');

import { Router, Route, Link } from 'react-router';

var ActionBar = React.createClass({
  bookWork: function(){
    console.log("作品预约按钮激活。");
    this.props.onBook();
  },
  render: function() {
    return (
      <div className="actionBar" style={{padding:'22.5px 0',height: 103.5,textAlign:'center'}}>
        <div>
           <Link to={"/work_book_page/" + this.props.workId +'/0'} style={{lineHeight: 'inherit'}} >
            <span
              ref="bookIcon"
              className="icon book_icon" 
              style={{fontSize:55}} />
            <div
              style={{letterSpacing: 10, marginLeft: 5, marginTop: -14, fontWeight: 'bold'}}
              ref="bookOption">
              预约
            </div>
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = ActionBar;