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
							<h4 className="weui_media_title">[亲自家庭]FamilyXXX</h4>
							<p className="weui_media_desc">摄影师：XXX</p>
						</div>
					</a>
					<i className="icon youjiantou right_bottom_icon "/>
				</section>

				<div className="weui_cells_title">预约信息</div>

				<section className="weui_panel">
					<div className="weui_cell">
						<div className="weui_cell_hd"><label className="yp_label">联系姓名</label></div>
						<div className="weui_cell_bd weui_cell_primary">
							<input className="weui_input" type="number" placeholder="您的昵称" />
						</div>
					</div>

					<div className="weui_cell">
						<div className="weui_cell_hd"><label className="yp_label">联系电话</label></div>
						<div className="weui_cell_bd weui_cell_primary">
							<input className="weui_input" type="number" placeholder="手机号码" />
						</div>
					</div>

					<div className="weui_cell">
						<div className="weui_cell_hd"><label className="yp_label">预约日期</label></div>
						<div className="weui_cell_bd weui_cell_primary">
							<input className="weui_input" type="number" placeholder="年/月/日" />
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
