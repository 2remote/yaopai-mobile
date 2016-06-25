import React from 'react';
import { Link } from 'react-router';

const ActionBar = ({id, price}) => (
  <div className="actionBar" style={{background:'white',height:'60px',lineHeight:'60px',padding:'0 0 0 10px'}}>
    <div>
      <p>
        <span>￥ {price}元</span>
        <Link className="orderButton" to={"/work_book_page/" + id +'/0'}>
          立即预约
        </Link>
      </p>
    </div>
  </div>
)

export {ActionBar as default};
