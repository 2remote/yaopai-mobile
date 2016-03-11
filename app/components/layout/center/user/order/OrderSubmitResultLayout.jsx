import React from 'react';

const OrderSubmitResultLayout = () => (
  <div>
    {/* 1. 预约提醒。The green stuff */}
    <div className="weui_panel weui_panel_access">
      <div className="weui_panel_bd">
        <a href="javascript:void(0);" className="weui_media_box weui_media_appmsg bg_green color_white"
          style={{
            padding: "30px 15px"
          }}
        >
          <div className="weui_media_hd">
            <i className="icon success_icon" style={{
              fontSize: '50px'
            }}></i>
          </div>
          <div className="weui_media_bd">
            <h4 className="weui_media_title">预约成功！</h4>
            <p className="weui_media_desc color_white">请尽快与摄影师取得联系获得更好服务！</p>
          </div>
        </a>
      </div>
    </div>
    {/* 2. 订单信息 */}
    <div className="weui_panel weui_panel_access">
      <div className="weui_panel_bd">
        <a href="javascript:void(0);" className="weui_media_box weui_media_appmsg">
          <div className="weui_media_hd">
            <img className="weui_media_appmsg_thumb" src="http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1" alt/>
          </div>
          <div className="weui_media_bd">
            <h4 className="weui_media_title">［亲子／家庭］WARM FAMILY</h4>
            <p className="weui_media_desc text_right">
              <button type="button" className="weui_btn weui_btn_mini weui_btn_plain_default">
                <i className="icon phone_icon" />
                致电摄影师
              </button>
            </p>
          </div>
        </a>
      </div>
    </div>
    {/* 3. 预约信息 */}
    <div className="weui_cells weui_cells_form">
      <div className="weui_cell">
        <div className="weui_cell_bd weui_cell_primary">
          <p>预约信息</p>
        </div>
      </div>
      <div className="weui_cell">
        <div className="weui_cell_hd">
          <label className="yp_label font_medium" style={{
            width: '4em'
          }}>预约人</label>
        </div>
        <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
          马先生
        </div>
      </div>
      <div className="weui_cell">
        <div className="weui_cell_hd">
          <label className="yp_label">联系方式</label>
        </div>
        <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
          13533044402
        </div>
      </div>
      <div className="weui_cell">
        <div className="weui_cell_hd">
          <label className="yp_label">拍摄日期</label>
        </div>
        <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
          2015-12-12 12:59:59
        </div>
      </div>
    </div>
    {/* 4. 包含服务 */}
    <div className="weui_cells weui_cells_form">
      <div className="weui_cell">
        <div className="weui_cell_bd weui_cell_primary">
          <p>包含服务</p>
        </div>
      </div>
      <div className="weui_cell align_items_start">
        <div className="weui_cell_hd">
          <label className="yp_label font_medium color_gray">预约人</label>
        </div>
        <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
          这里是服务内容描述这里是服务内容描述这里是服务内容描述这里是服务内容描述这里是服务内容描述这里是服务内容描述这里是服务内容描述这里是服务内容描述这里是服务内容描述这里是服
        </div>
      </div>
    </div>
  </div>
);

export { OrderSubmitResultLayout as default };