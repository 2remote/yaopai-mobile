import React from 'react';


var WorkDetail = React.createClass({

  getInitialState: function() {
    return {
      showPanel : false,
      Detail:{}
    }
  },

  handleClick: function() {
    this.setState({showPanel: !this.state.showPanel});
  },

  render: function() {
    var style = {
      display: this.state.showPanel ? 'block' : 'none' ,
    }

    return (
        <div className="workDetail">
          <ul className="package">
            <li>
              <i className="icon yifu"/>
              <span>服装造型</span>
            </li>
            <li>
              <i className="icon meizhuang" style={{fontSize:'25px'}}/>
              <span>提供化妆</span>
            </li>
            <li>
              <i className="icon jingxuan" style={{fontSize:'32px'}}/>
              <span>照片精修</span>
            </li>
            <li>
              <i className="icon shijian"/>
              <span>5天拍摄</span>
            </li>
          </ul>
          <button onClick={this.handleClick}>查看套餐详情</button>

          <div className="workDetail-mask" style={style}>
            <div className="panel">
              <p className="a">套餐详情</p>
              <p className="b">Package Detail</p>

              <ul>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">拍摄时长</span>
                  <span className="b">{this.props.data.Detail.Duration}</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">底片张数</span>
                  <span className="b">{this.props.data.Detail.PlateCount}张</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">精修张数</span>
                  <span className="b">{this.props.data.Detail.TruingCount}张</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">服装数目</span>
                  <span className="b">{this.props.data.Detail.CostumeCount}件</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">化妆造型</span>
                  <span className="b">{this.props.data.Detail.MakeUpSupport?'提供':'暂无'}</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">提供原片</span>
                  <span className="b">{this.props.data.Detail.OriginalSupport?'提供':'暂无'}</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">提供产品</span>
                  <span className="b">{this.props.data.Detail.PhysicalSupport?'提供':'暂无'}</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">拍摄组数</span>
                  <span className="b">{this.props.data.Detail.UnitCount}组</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">场景数量</span>
                  <span className="b">{this.props.data.Detail.SceneCount}个</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">拍摄人数</span>
                  <span className="b">{this.props.data.Detail.PeopleCount}人</span>
                </li>
                <li>
                  <i className="icon success_icon"></i>
                  <span className="a">拍摄机位</span>
                  <span className="b">{this.props.data.Detail.SeatCount}个</span>
                </li>

              </ul>
              <button className="btn" onClick={this.handleClick}>关闭</button>
            </div>
          </div>
        </div>
    );
  }
});

export {WorkDetail as default};