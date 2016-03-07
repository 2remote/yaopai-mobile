import React from 'react';

const OrderDetailLayout = () => (
  <div className="container">
		<header className="detail-header">
			<h1>预约成功</h1>
			<span>请尽快与摄影师取得联系,方便您更好的摄影服务</span>
		</header>

		<article className="detail-body">
			<header>
				<img src="" alt=""/>
				可以拍摄的水果
				<span><i className='icon grapher_icon' />3000</span>
			</header>

			<section className="ipt-box">
				<p>预约姓名 <input type="text" /></p>
				<p>预约电话 <input type="text" /></p>
				<p>拍摄日期 <input type="text" /></p>
				<span>包含服务</span>
			</section>

			<footer>
				测试文字.测试文字.测试文字测试文字.测试文字.测试文字
				测试文字.测试文字.测试文字测试文字.测试文字.测试文字
				测试文字.测试文字.测试文字测试文字.测试文字.测试文字
			</footer>
		</article>

		<footer className="footer">
			<i className='icon grapher_icon' />致电摄影师
		</footer>
	</div>
);

export default OrderDetailLayout;