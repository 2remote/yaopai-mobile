import React from 'react';

import {imgModifier} from '../Tools';

var DoubleCheckInfo = React.createClass({

  getDefaultProps: function() {
    return {
      order: {
        Photograper : {}
      }
    };
  },
  
  render: function() {
    var style = {
      grapherImage:{
        width:66,
        height: 66,
        marginTop: 17
      },
      grapherName:{
        color:'#4d4d4d',
        marginBottom: 9
      },
      priceImage:{
        margin: '0 6px -2px -7px',
        fontSize: 22
      },
      grapherPrice:{
        color: '#969696',
        fontWeight:'bold'
      },
      label:{
        fontSize:'1.333333em',
        color:'#ababab',
      },
      input:{
        color:'#ababab',
        padding: '3px 0',
        margin: '18px 0 0 15px',
        width: '170px',
        lineHeight: '19px',
        fontSize: '1em',
        border: 0,
        borderBottom: '2px solid #c4c4c4',
        borderRadius: 0,
        verticalAlign: 'super',
      }
    };


    return (
      <div className="doubleCheckInfo">
        <img 
          style={style.grapherImage}
          ref="grapherImage"
          src={this.props.order.Albums?this.props.order.Albums.Cover:this.props.order.Photographer?this.props.order.Photographer.Avatar:''} />

        <div 
          style={style.grapherName}
          ref="grapherName" >{this.props.order.Albums?this.props.order.Albums.Title:this.props.order.Photographer?this.props.order.Photographer.NickName:''}</div>

        <span 
          ref="priceImage"
          className="icon price_icon"
          style={style.priceImage} />

        <span 
          style={style.grapherPrice}
          ref="grapherPrice" >{this.props.order.Price?this.order.Price:'面议'}</span>

        <div>
          <span 
            style={style.label}
            ref="userNameLabel">预约姓名</span>
          <input 
            style={style.input}
            ref="usernameInput"
            type="text"
            disabled
            value={this.props.order.BuyerName}
            placeholder="将显示您的预订姓名" />
        </div>
        <div>
          <span 
            style={style.label}
            ref="mobilePhoneLabel">预约电话</span>
          <input 
            style={style.input}
            ref="mobilePhoneInput"
            type="text"
            disabled
            value={this.props.order.BuyerTel}
            placeholder="将显示您的联系电话" />
        </div>
        <div>
          <span 
            style={style.label}
            ref="dateLabel">拍摄日期</span>
          <input 
            style={style.input}
            ref="dateInput"
            type="text"
            disabled
            value={(this.props.order.AppointedTime + '').slice(0,10)}
            placeholder="将显示您的拍摄日期" />
        </div>

      </div>
    );
  }
});

module.exports = DoubleCheckInfo; 