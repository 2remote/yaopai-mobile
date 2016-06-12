import React from 'react';

import { Router, Route, Link } from 'react-router';

var ActionBar = React.createClass({
  render: function() {
    return (
      <div className="actionBar" style={{padding:'22.5px 0',height: 103.5,textAlign:'center'}}>
        <div>
          <Link to={"/work_book_page/0/"+this.props.data.Id} style={{lineHeight: 'inherit'}} >

            <div
              style={{ position:'fixed',bottom:'0',width:'100%', marginTop: -14, background:'#E6C288', color:'#000',fontSize:'16px', lineHeight:'60px',}}
              ref="bookOption">
              立即预约
            </div>
          </Link>
        </div>
      </div>
    );
  }
});

export {ActionBar as default};