import React from 'react';

const OrderRefundLayout = () => (
  <div>
    {/* 1. 订单信息panel */}
    <div className="weui_panel weui_panel_access">
      <div className="weui_panel_bd">
        <a className="weui_media_box weui_media_appmsg">
          <div className="weui_media_hd">
            <img className="weui_media_appmsg_thumb"
                 src="http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1"
                 alt/>
          </div>
          <div className="weui_media_bd">
            <div className="weui_media_title">
              少女写真（闺蜜组）
            </div>
            <div className="weui_media_desc">
              摄影师：糖宝
            </div>
            <div className="weui_media_desc">
              总金额：<span className="color_red">¥ 1270.00</span>
            </div>
          </div>
          <i className="icon youjiantou top_right_icon" />
        </a>
      </div>
      <hr className="separator" />
      <div className="weui_panel_hd">
        订单编号：287jqkqiUZztQlC3<br />
        交易时间：2015-12-12 12:59:59
      </div>
    </div>
    {/* 2. 退款模块 */}
    <div className="weui_cells_title">
      退款信息
    </div>
    {/* 3. 退款表单 */}
    <div className="weui_cells weui_cells_form">
      <div className="weui_cell">
        <div className="weui_cell_hd">
          <div className="yp_label">退款方式</div>
        </div>
        <div className="weui_cell_bd weui_cell_primary">
          {/*<input className="weui_input" type="text" readonly />*/}
          <div className="font_medium">
            原路退回
            <span className="color_gray">（3-10个工作日完成，无手续费）</span>
          </div>
        </div>
      </div>
      <div className="weui_cell">
        <div className="weui_cell_hd">
          <div className="yp_label">退款金额</div>
        </div>
        <div className="weui_cell_bd weui_cell_primary">
          {/*<input className="weui_input" type="text" readonly />*/}
          <div className="font_medium">
            ¥ 1267元
            <span className="color_gray">（优惠不可退）</span>
          </div>
        </div>
      </div>
      <div className="weui_cell weui_cell_select weui_select_after">
        <div className="weui_cell_hd">
          <div className="yp_label color_red">退款原因</div>
        </div>
        <div className="weui_cell_bd weui_cell_primary">
          {/*<input className="weui_input" type="text" readonly />*/}
          <select className="weui_select font_medium">
            <option value="1">不想拍了</option>
          </select>
        </div>
      </div>
    </div>
    {/* 4. 备注 */}
    <div className="weui_cells_title">
      备注
    </div>
    <div className="weui_cells weui_cells_form">
      <div className="weui_cell">
        <div className="weui_cell_bd weui_cell_primary">
          <textarea className="weui_textarea font_medium" placeholder="请输入备注" rows="4">
          </textarea>
        </div>
      </div>
    </div>
    {/* 5. 提交按钮 */}
    <div style={{
      padding: '24px 15px'
    }}>
      <button className="weui_btn weui_btn_primary">提交申请</button>
    </div>
    {/* 6. 退款说明 */}
    <article className="weui_article">
      <section>
        <h2 className="title">退款说明：</h2>
        <p className="font_small color_gray">
          A、未拍摄前：<br />
          1、约定拍摄日期前3（具体日期待定）天以上，申请修改拍摄档期和申请退款，均不扣款，平台保障，放心支付。<br />
          2、约定拍摄日的前3天内，如临时改期，将扣取订单总价的10%，作为摄影师档期占用补偿。申请退款将扣去订单总价的30%作为毁约补偿。<br />
          B、拍摄完成后：<br />
          如用户对拍摄作品不满意，如需申请退款，务必先联系客服人员，然后提交退款原因说明及上传凭证图片，经过YAOPAI 初步确认后，由工作人员为您办理退款（作品如何评判？退多少？退款标准如何定？）或提供补救方案。
        </p>
      </section>
      <section>
        <h2 className="title">退款规则：</h2>
        <p className="font_small color_gray">
          1、若办理退款，退款会优先使用您原订单的支付方式进行退回。<br />
          2、如果所支付的订单中含有非现金部分(如优惠券)，在退款时，非现金部分不能折现。<br />
          3、如有疑问，请拨打客服热线： 400-888-8888
        </p>
      </section>
    </article>
	</div>
);

export default OrderRefundLayout;