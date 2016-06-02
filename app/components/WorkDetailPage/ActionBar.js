import React from 'react';

import { Router, Route, Link } from 'react-router';

var ActionBar = React.createClass({
  bookWork: function(){
    console.log("作品预约按钮激活。");
    this.props.onBook();
  },
  render: function() {
    return (
      <div className="actionBar" style={{background:'white',height:'60px',lineHeight:'60px',padding:'0 0 0 10px'}}>
        <div>
          <p>
            <span>￥ {this.props.data.Price}元</span>
            <Link className="orderButton" to={"/work_book_page/" + this.props.data.Id +'/0'}>
              立即预约
            </Link>
          </p>
        </div>
      </div>
    );
  }
});

export {ActionBar as default};