import React from 'react';
import YPUIOrderCard from '../../../../UI/YPUIOrderCard.jsx';

//* order.id: 订单ID
//* order.status: 订单状态,分为:
//* order.userId: 订单-用户ID
//* order.grapher.id: 订单-摄影师ID
//* order.grapher.avatar: 订单-摄影师头像
//* order.grapher.name: 订单-摄影师昵称
//* order.grapher.phone: 订单-摄影师电话号码
//* order.title: 订单标题
//* order.time: 预约时间
//* order.price: 订单价格
//* order.payedAmount: 订单已付价格

let sampleOrderList = [{
  id: 1,
  status: 1,
  user: {
    id: 1
  },
  grapher: {
    id: 1001,
    avatar: 'http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1',
    name: '糖宝',
    phone: '17600801640'
  },
  title: '少女写真(闺蜜组)',
  time: '2016-03-07',
  price: '1267',
  payedAmount: '1267'
}, {
  id: 2,
  status: 1,
  user: {
    id: 2
  },
  grapher: {
    id: 1002,
    avatar: 'http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1',
    name: '糖宝2',
    phone: '17600801640'
  },
  title: '少女写真(闺蜜组)',
  time: '2016-03-09',
  price: '1267',
  payedAmount: '1267'
}, {
  id: 3,
  status: 1,
  user: {
    id: 2
  },
  grapher: {
    id: 1003,
    avatar: 'http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1',
    name: '糖宝3',
    phone: '17600801640'
  },
  title: '少女写真(闺蜜组)',
  time: '2016-03-09',
  price: '1267',
  payedAmount: '1267'
}, {
  id: 4,
  status: 1,
  user: {
    id: 2
  },
  grapher: {
    id: 1004,
    avatar: 'http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1',
    name: '糖宝4',
    phone: '17600801640'
  },
  title: '少女写真(闺蜜组)',
  time: '2016-03-09',
  price: '1267',
  payedAmount: '1267'
}];

const OrderListLayout = () => (
  <div>
    {sampleOrderList.map((order, index) =>
      <YPUIOrderCard order={order} key={index}/>
    )}
    <div
	    style={{padding: '20px 15px 10px',fontSize: '12px'}}
	    className="color_gray text_center"
    >
      温馨提示：交易过程中如有异常<br />
      请拨打客服热线：0371-65337727
    </div>
  </div>
);

export {OrderListLayout as default};