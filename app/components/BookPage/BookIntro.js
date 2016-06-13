import React from 'react';
import WeUI from 'react-weui';
const { CellsTitle } = WeUI;
import {imgModifier} from '../Tools';

var BookIntro = React.createClass({

  getDefaultProps: function() {
    return {
      photographer:[]
    };
  },

  render: function() {
    return (
      <div>
        <div style={{height:'1px'}}></div>
        {/* 1. 套餐详情 */}
        <CellsTitle>套餐详情</CellsTitle>

        <section className="weui_panel">
          <a href="javascript:void(0);" className="weui_media_box weui_media_appmsg">
            <div className="weui_media_hd">
              <img
                className="weui_media_appmsg_thumb"
                src={imgModifier(this.props.albums?this.props.albums.Cover:this.props.photographer.Avatar, "avatar")}
              />
            </div>
            <div className="weui_media_bd">
              <h4 className="weui_media_title">
                {this.props.albums.Title}
              </h4>
              <p className="weui_media_desc">
                {this.props.albums ? this.props.albums.Photographer.NickName : ` 摄影师：${this.props.photographer.NickName}`}
              </p>
            </div>
          </a>
        </section>
      </div>
    );
  }
});

export {BookIntro as default};
