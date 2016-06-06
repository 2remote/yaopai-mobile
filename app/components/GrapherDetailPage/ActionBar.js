import React from 'react';
import { Link } from 'react-router';

var ActionBar = React.createClass({
  render() {
    return (
      <div className="actionBar" style={{padding:'22.5px 0',height: 103.5,textAlign:'center'}}>
        <div>
          <Link to={"/work_book_page/0/"+this.props.data.Id} style={{lineHeight: 'inherit'}} >
            <span
              className="icon book_icon"
              ref="bookIcon"
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

export {ActionBar as default};
