import React from 'react';

import WeuiCells from '../../../UI/WeuiCells';

let list1 = [{
  icon: 'wallet_icon',
  title: '我的收藏',
  href: '/center/u/collect'
}];

let list2 = [{
  icon: 'wallet_icon',
  title: '个人资料',
  href: '/center/u/profile'
},{
  icon: 'wallet_icon',
  title: '我的订单',
  href: '/center/u/order'
},{
  icon: 'wallet_icon',
  title: '钱包',
  money: '0.00',
  href: '/center/u/purse'
},{
  icon: 'wallet_icon',
  title: '联系客服'
}];

const UserCenterLayout = () => (
  <div>
    <WeuiCells cellList={list1}/>
    <WeuiCells cellList={list2}/>
  </div>
);

export default UserCenterLayout;