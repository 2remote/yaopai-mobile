import React from 'react';
import {imgModifier} from '../Tools';

var GrapherIntro = React.createClass({
  getDefaultProps: function() {
    return {
      data: {

      }
    };
  },
  render: function() {
    let avatarSoruce = this.props.data.User ? avatarSoruce = this.props.data.Avatar : null;

    let name = '读取中...';
    if ( typeof this.props.data.User != 'undefined'){
      name = this.props.data.NickName;
    }

    let cityName = this.props.data.CityName;

    if(this.props.from === 'interview'){
      if(this.props.data){
        name = this.props.data.NickName;
      };
    };
    return (
      <div ref="grapherIntro" className="grapherIntro">
        <div className="baseInfo">
          <div className="avatar" style={{backgroundImage:`url('${this.props.data.Avatar}')`}} />
          <p className="a">{name}</p>
          <p className="b">{this.props.data.Signature}</p>
          <p className="c"><i className="icon didian"></i>{cityName}</p>

        </div>
        <div className="order">
          <ul>
            <li><span className="count">{this.props.data.TotalAlbums}</span> 作品</li>
            <li><span className="count">{this.props.data.Sales}</span> 订单</li>
            <li><span className="count">{this.props.data.Marks}</span> 关注</li>
          </ul>
        </div>
      </div>
    );
  }
});

export {GrapherIntro as default};
