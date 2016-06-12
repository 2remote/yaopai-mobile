import React from 'react';
import { Link } from 'react-router';

var ActionBar = React.createClass({
  render() {
    return (
      <div className="actionBar" style={{padding:'22.5px 0',height: 103.5,textAlign:'center'}}>
        <div>
          <Link to={"/work_book_page/0/"+this.props.data.Id} style={{lineHeight: 'inherit'}} >
<<<<<<< HEAD
            <span
              className="icon book_icon"
              ref="bookIcon"
              style={{fontSize:55}} />
=======

>>>>>>> add-grapher-css
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
