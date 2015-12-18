var React = require('react');
var Reflux = require('reflux');
var DocumentTitle = require('react-document-title');
var History = require('react-router').History;
var localStorage = require('web-storage')().localStorage;

import ExtraServiceBox from '../WorkDetailPage/ExtraServiceBox';
var OrderActions = require('../../actions/OrderActions');
var OrderStore = require('../../stores/OrderStore');

var CallBox = React.createClass({
  render: function() {
    return (
      <a 
        style={{lineHeight:'inherit'}}
        href={"tel:" + this.props.data}>
        <div 
          style={{color:'#3c3c3c'}}
          className="callBox">
          <span
             className="icon phone_circle_icon" 
            style={{width:55, fontSize:55}}
            ref="callImage" />
          <div ref="callText" >致电咨询</div>
        </div>
      </a>
    );
  }
});

var ActionBar = React.createClass({
  getDefaultProps: function() {
    return {
      data:{}
    };
  },
  render: function() {
    var style = {
      actionBar: {
        width: '81%',
        margin: '21px auto'
      }
    };
    return (
      <div 
        style={style.actionBar}
        className="actionBar">
        <CallBox data={this.props.data} />
      </div>
    );
  }
});

var DoubleCheckInfo = React.createClass({

  getDefaultProps: function() {
    return {
      order: {}
    };
  },

  render: function() {
    console.log(this.props.order)
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
        margin: '0 6px -2px -7px'
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
        borderWidth: '0 0 2px',
        borderRadius: 0,
        verticalAlign: 'super',
        borderColor: 'transparent transparent #c4c4c4'
      }
    };
    var mainImage = '';
    var mainText = '';
    var showName = '';
    var showPhone = '';
    if(this.props.type == 'p'){
      mainImage = this.props.order.User ? this.props.order.User.Avatar : '';
      mainText = this.props.order.User ? this.props.order.User.NickName : '';
      showName = this.props.order.BuyerName;
      showPhone = this.props.order.BuyerTel;
    }else if(this.props.type == 'u'){
      mainImage = this.props.order.Albums?this.props.order.Albums.Cover:this.props.order.Photographer?this.props.order.Photographer.Avatar :'';
      mainText = this.props.order.Albums?this.props.order.Albums.Title:this.props.order.Photographer?this.props.order.Photographer.NickName :'';
      showName = this.props.order.Photographer?this.props.order.Photographer.NickName : '';
      showPhone = this.props.order.Photographer?this.props.order.Photographer.BusinessPhone : '';
    }
    return (
      <div className="doubleCheckInfo">
        <img 
          style={style.grapherImage}
          ref="grapherImage"
          src={mainImage} />

        <div 
          style={style.grapherName}
          ref="grapherName" >{mainText}</div>

        <img 
          style={style.priceImage}
          ref="priceImage"
          src="imgs/common/work-price.png"
          srcSet="imgs/common/work-price@2X.png 2x" />

        <span 
          style={style.grapherPrice}
          ref="grapherPrice" >{this.props.order.Albums?this.props.order.Albums.Price:'面议'}</span>

        <div>
          <span 
            style={style.label}
            ref="userNameLabel">{this.props.type == 'p' ? '预约用户姓名':'摄影师'}</span>
          <input 
            style={style.input}
            ref="usernameInput"
            type="text"
            disabled
            value={showName}/>
        </div>
        <div>
          <span 
            style={style.label}
            ref="mobilePhoneLabel">{this.props.type == 'p' ? '预约电话':'联系电话'}</span>
          <input 
            style={style.input}
            ref="mobilePhoneInput"
            type="text"
            disabled
            value={showPhone} />
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

var ViewOrder = React.createClass({
  mixins: [Reflux.listenTo(OrderStore,'_onOrderStoreChange'),History],

  handleClose: function () {
    this.history.go(-1);
  },

  getInitialState: function() {
    return {
      order: {}
    };
  },
  componentDidMount: function() {
    if(!this.props.params.orderId){
      console.log('没有指定正确的订单id');
      this.history.go(-2);
    }else{
      console.log('begin to get order:'+this.props.params.orderId);
      OrderActions.get(this.props.params.orderId);
    }
  },
  _onOrderStoreChange : function(data){
    console.log(data);
    if(data.flag == 'get'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({order : data.order});
      }
    }
  },

  render: function() {
    var style = {
      bookSuccessDialog: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        minHeight: '100%',
        backgroundImage: 'url(imgs/bookPageBg.png)',
        paddingBottom: 30
      },
      headText: {
        fontSize: '2em',
        color: '#3c3c3c',
        fontWeight: 'lighter',
        margin: '29px auto 0'
      },
      subText:{
        marginBottom: 7
      },
      close: {
        position: 'absolute',
        right: 29,
        top: 25,
        margin: -15,
        padding: 15
      },
      doubleCheckTicket: {
        backgroundColor: 'white',
        margin: '0 auto',
        width:'90%'
      },
      wave:{
        backgroundImage: 'url("imgs/bookIntroBg.png")',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
        width: '90%',
        margin: '0 auto',
        height: 20
      }
    };
    var serviceContent = '';
    if(this.state.order.Albums){
      serviceContent = <ExtraServiceBox services={this.state.order.Albums?this.state.order.Albums.Service:''}/>
    }
    var title = '';
    var information = '';
    var phone = '';
    if(this.state.order.State === 0){
      title = '订单详情';
      phone = this.state.order.BuyerTel;
      if(this.props.params.type == 'p'){
        information = '请尽快与用户取得联系，确定预约时间';
      }else if(this.props.params.type == 'u'){
        information = '请尽快与摄影师取得联系，方便您更好的摄影服务';
      }
    }else if(this.state.order.State === 1){
      title = '订单已完成';
      information = '恭喜您，该订单已完成，谢谢使用邀拍的服务';
    }else if(this.state.order.State == 2){
      title = '订单已关闭';
      phone = this.state.order.Photographer?this.state.order.Photographer.BusinessPhone:'';
      if(this.props.params.type == 'p'){
        information = '用户已经取消该订单！';
      }else if(this.props.params.type == 'u'){
        information = '您已经取消该订单！';
      }
    }
    return (
      <div 
        style={style.bookSuccessDialog}
        className="bookSuccessDialog">
        <DocumentTitle title="订单详情"/> 
        <div style={style.headText} ref="headText" >{title}</div>
        <div style={style.subText}>{information}</div>
        <img 
          style={style.close}
          onClick={this.handleClose}
          ref="closeImage"
          src="imgs/common/close-image.png"
          srcSet="imgs/common/close-image@2X.png 2x" />
        <div 
          style={style.doubleCheckTicket}
          className="doubleCheckTicket">
          <DoubleCheckInfo type={this.props.params.type}
            order={this.state.order} />
          {serviceContent}
        </div>
        <div style={style.wave}></div>
        <ActionBar data={phone} />
      </div>
    );
  }
});

module.exports = ViewOrder;
