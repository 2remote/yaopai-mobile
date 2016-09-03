import React from 'react'

import WeuiCells from '../../UI/WeuiCells'


class Grapher extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cells: {
        list1: [{
          icon: 'wallet_icon',
          title: '我的收藏',
          href: '/center/g/update'
        }],
        list2: [{
          icon: 'wallet_icon',
          title: '个人资料',
          href: '/center/g/order'
        },{
          icon: 'wallet_icon',
          title: '我的订单',
          href: '/center/g/order'
        },{
          icon: 'wallet_icon',
          title: '钱包',
          money: '0.00',
          href: '/center/g/order'
        },{
          icon: 'wallet_icon',
          title: '联系客服',
          href: '/center/g/order'
        }]
      }
    }
  }
  render() {
    return (
      <div>
        <WeuiCells cellList={this.state.cells.list1} />
        <WeuiCells cellList={this.state.cells.list2} />
      </div>
    )
  }
}

export { Grapher as default }