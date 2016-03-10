import React from 'react';
import WeUI from 'react-weui';
import {Button} from 'react-weui';
let avatar= 'http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1';

class OrderSubmitLayout extends React.Component {
	render() {
		return(
			<div>
				<div className="weui_cells_title">套餐详情</div>

				<section className="weui_panel">
					<a href="javascript:void(0);" className="weui_media_box weui_media_appmsg">
						<div className="weui_media_hd">
							<img src={avatar} className="weui_media_appmsg_thumb" />
						</div>
						<div className="weui_media_bd">
							<h4 className="weui_media_title">标题一</h4>
							<p className="weui_media_desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
						</div>
					</a>
				</section>

				<div className="weui_cells_title">预约信息</div>

				<section className="weui_panel">
					<div className="weui_cell">
						<div className="weui_cell_hd"><label className="weui_label">qq</label></div>
						<div className="weui_cell_bd weui_cell_primary">
							<input className="weui_input" type="number" pattern="[0-9]*" placeholder="请输入qq号" />
						</div>
					</div>

					<div className="weui_cell">
						<div className="weui_cell_hd"><label className="weui_label">qq</label></div>
						<div className="weui_cell_bd weui_cell_primary">
							<input className="weui_input" type="number" pattern="[0-9]*" placeholder="请输入qq号" />
						</div>
					</div>

					<div className="weui_cell">
						<div className="weui_cell_hd"><label className="weui_label">qq</label></div>
						<div className="weui_cell_bd weui_cell_primary">
							<input className="weui_input" type="number" pattern="[0-9]*" placeholder="请输入qq号" />
						</div>
					</div>
				</section>

				<div className="weui_cells_title">备注</div>

				<div className="weui_cell weui_panel">
					<div className="weui_cell_bd weui_cell_primary">
						<textarea className="weui_textarea" placeholder="请输入评论" rows="3" />
						<div className="weui_textarea_counter"><span>0</span>/200</div>
					</div>
				</div>

				<div className="weui_btn_area">
					<Button type="primary">提交订单</Button>
				</div>
			</div>
		);
	}
}


export {OrderSubmitLayout as default};
