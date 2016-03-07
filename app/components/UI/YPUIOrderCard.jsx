import React from 'react';

/**
 * 本component是个人中心中订单的UI组件,用于展示不同状态的订单UI
 * @param order: 订单信息,包含以下内容:
 * order.id: 订单ID
 * order.status: 订单状态,分为:
 * order.userId: 订单-用户ID
 * order.grapher.id: 订单-摄影师ID
 * order.grapher.avatar: 订单-摄影师头像
 * order.grapher.name: 订单-摄影师昵称
 * order.grapher.phone: 订单-摄影师电话号码
 * order.title: 订单标题
 * order.time: 预约时间
 * order.price: 订单价格
 * order.payedAmount: 订单已付价格
 * @constructor
 */
const YPUIOrderCard = ({order}) => (
  <div style={{
    border: '3px solid red',
    marginBottom: '15px'
  }}>
    <div className="grapherAvatar">
      <img src={order.grapher.avatar} style={{
        width: '100%'
      }}/>
      <br/>
      <div>{order.grapher.name}</div>
    </div>
    <div className="orderDetail">
      <div>{order.title}</div>
      <div>预约时间:{order.time}</div>
      <div>价格:{order.price}</div>
      <div>实付:{order.payedAmount}</div>
    </div>
    <div className="orderOperate">
      <div><a href={`tel:${order.grapher.phone}`}>联系</a></div>
      <div><button type="button">取消</button></div>
    </div>
  </div>
);

export default YPUIOrderCard;
