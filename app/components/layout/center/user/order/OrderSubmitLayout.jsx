import React from 'react';

const OrderSubmitLayout = () => (
  <div className="container">
		<header>
			<h3>当前订单</h3>
			<img src="" alt=""/>
			<span>少女写真(闺蜜组)</span>
		</header>

		<article>
			<p>
				<i className='icon grapher_icon' />
				<input type="text"/>
			</p>
			<p>
				<i className='icon grapher_icon' />
				<input type="text"/>
			</p>
			<p>
				<i className='icon grapher_icon' />
				<input type="text"/>
			</p>
			<p>
				<i className='icon grapher_icon' />
				<input type="text"/>
			</p>

			<button>提交订单</button>
		</article>
	</div>
);

export default OrderSubmitLayout;