import React from 'react';

const OrderPayPreLayout = () => (
	<div className="container">
		<header>
			<i className='icon grapher_icon' />
			<i className='icon grapher_icon' />
			<i className='icon grapher_icon' />
			<i className='icon grapher_icon' />
		</header>

		<div>
			<span>订单内容</span>
			<span>费用:1267</span>
		</div>

		<article>
			预约服务:少女写真(闺蜜组)<br/>
			预约摄影师:和大下<br/>
			拍摄日期:2015年11月30日<br/>
			预约姓名:马骁驰<br/>
			预约电话:313131321331<br/>
			备注:测试文字测试文字测试文字测试文字测试文字
		</article>

		<footer>
			<button>支付1323元</button>
		</footer>
	</div>
);

export { OrderPayPreLayout as default };