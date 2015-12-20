var React = require('react');
var UserActions = require('../../actions/UserActions');
var Tappable = require('react-tappable');
var DocumentTitle = require('react-document-title');

var OrderActions = require('../../actions/OrderActions');
import { Link, History,Location } from 'react-router';

var BookTicketRow = React.createClass({
  getDefaultProps: function() {
    return {
      data: {}
    };
  },
  getInitialState: function () {
    return {
      showCancelDialog: false,
    }
  },
  toggleCancelDialog: function() {
    var state = this.state.showCancelDialog ? false : true;
    this.setState({showCancelDialog: state});
  },
  cancelOrder : function(){
    OrderActions.close(this.props.data.Id);
    this.toggleCancelDialog();
  },
  render: function() {
    let deviceHeight = parseInt(window.innerHeight);
    let heightRatio = deviceHeight/627;
    var style = {
      row: {
        clear: 'both',
        height: 165,
        position: 'relative',
      },
      bookTicket: {
        backgroundImage: this.state.showCancelDialog ? 'url(imgs/userCenterPage/book-success-ticket-bk.png)' : 'url(imgs/userCenterPage/book-ticket-bk.png)',
        width: '83.4666667%',
        height: 150,
        float: 'left',
        backgroundSize: '100% 150px',
        backgroundRepeat: 'no-repeat',
      },
      mask: {
        position: 'absolute',
        left: '0',
        top: '0',
        background: 'rgba(255,255,255,.7)',
        width: '100%',
        height: 150,
        backgroundSize: '100% 150px',
        zIndex: '9',
        lineHeight: '150px',
        textAlign: 'left',
        padding: '0 26% 0 14%',
        boxSizing: 'border-box',
      },
      maskIcon: {
        verticalAlign: 'middle',
        marginRight: '15%',
        fontSize: 72,
        color: 'red'
      },
      maskTurn: {
        float: 'right',
        marginTop: '63.5px',
        fontSize: 55
      },
      avatar: {
        width: 66,
        height: 66,
        margin: '16.5px 0 3px 0',
      },
      userName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: 88,
        position: 'absolute',
        marginLeft: -10
      },
      box: {
        borderRight: this.props.confirm ? '#ffffff 1px solid' : '#DADADA 1px solid',
        height: 125,
        margin: '12.5px 0 auto',
        float: 'left',
        padding: '0 7.348243% 0 8.306709%'
      },
      label: {
        fontSize: '0.833333333em',
        color: this.props.confirm ? '#ffffff' : '#909090'
      },
      userInfo: {
        color: this.props.confirm ? '#ffffff' : '#6b6b6b'
      },
      userInfoLine: {
        marginBottom: 9
      },
      toDetial: {
        verticalAlign: 'bottom',
        position: 'relative',
        right: '8%',
        top: '-8px',
        float: 'right',
        fontSize: 25,
        color: 'gray'
      },
      actionBox: {
        float: 'right',
        width: '16.5%',
        position: 'relative',
        height: 150,
        display: this.props.confirm ? 'none' : {}
      },
      userInfoBox: {
        height: 121.5,
        margin: '12.5px 7.667732% auto 36.741214%',
        WebkitBorderImage: this.props.confirm ? {} : 'url(imgs/userCenterPage/book-dash.png) 0 2',
        borderImage: this.props.confirm ? {} : 'url(imgs/userCenterPage/book-dash.png) 0 2',
        borderWidth: '0 1px 0 0',
        textAlign: 'left',
        padding: '3.5px 0 0 7.667732%'
      },
      cancelBox: {
        position: 'absolute',
        bottom: 14,
        right: '28.6885246%',
        padding: '9px 17px',
        margin: '-9px -17px',
      },
      contactBox: {
        position: 'absolute',
        top: 17,
        right: '28.6885246%',
        padding: '9px 17px',
        margin: '-9px -17px',
      },
      buttonText: {
        fontSize: '0.666666667em',
        color: '#909090',
        marginTop: -3,
        height: '20px',
        lineHeight: '20px',
      },
      confirmTitle: {
        fontSize:'1.666666667em',
        marginBottom: 48*heightRatio
      },
      hide: {
        display: 'none',
      },
      cancelOrder: {
        float: 'left',
        marginLeft: '20.2666667%'
      },
      cancelFrame: {
        float: 'right',
        marginRight: '20.2666667%'
      },
      actionBar: {
        paddingTop: 52.5*heightRatio,
        height: 103.5,
        textAlign: 'center'
      },
      showCancelBookDialog: {
        backgroundColor: 'black',
        textAlign: 'center',
        minHeight: '100%',
        position: 'fixed',
        width: '100%',
        color:'#ffffff',
        top: 0,
        zIndex: 100,
        paddingTop: 40*heightRatio,
        opacity: 0.88,
        display: 'block',
      },
      link: {
        lineHeight: 'inherit'
      }
    };

    let maskShow = this.props.data.State === 1 || this.props.data.State === 2 ;
    let maskStyle = maskShow ? style.mask : style.hide;
    let linkToStyle= maskShow ? style.hide : style.toDetial;
    let maskText = '';
    let maskIconSrc = '';
    let maskIconSrcSet = '';
    if (this.props.data.State === 2){
      maskText ='订单取消';
      maskIconSrc = ' fail_icon '; 
    }  
    if (this.props.data.State === 1){
      maskText = '订单成功';
      maskIconSrc = ' success_icon ';
    }
    let rondomAvatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(this.props.data.UserId) % 47 + 1 ) + '.png';
    
    var jobTicket = (
      <div style={style.bookTicket} className="jobTicket">
          <div 
            style={style.box}
            className="userBox">
            <img 
              style={style.avatar}
              ref="userAvatar"
              src={this.props.data.Photographer.Avatar || rondomAvatar} />
            <div 
              style={style.userName}
              ref="userName" >{this.props.data.Photographer.NickName}</div>
          </div>

          <Link style={style.link} to={"/viewOrder/u/"+this.props.data.Id}>
          <div 
            style={style.userInfoBox}
            className="userInfoBox" >
            <div style={style.userInfoLine}>
              <span style={style.label} ref="userNameLabel" >姓名：</span>
              <span style={style.userInfo} ref="userName" >{this.props.data.BuyerName}</span>
            </div>
            <div style={style.userInfoLine}>
              <span style={style.label} ref="userPhoneLabel" >电话：</span>
              <span style={style.userInfo} ref="userPhone" >{this.props.data.BuyerTel}</span>
            </div>
            <div style={style.userInfoLine}>
              <span style={style.label} ref="userBookDateLabel" >时间：</span>
              <span style={style.userInfo} ref="userBookDate" >{this.props.data.AppointedTime.slice(0,10)}</span>
            </div>
            <div >
              <span style={style.label} ref="suggestPriceLabel" >参考金额：</span>
              <span style={style.userInfo} ref="suggestPrice" >{this.props.data.IsSpecifiesAlbums?this.props.data.Price:'面议'}</span>
              <span
                className="icon detail_icon"
                style={style.toDetial} />
            </div>
          </div>
          </Link>
        </div>
    );

    return (
      <div 
        style={style.row}
        className="bookTicketRow">
        <Link to={"/viewOrder/u/"+this.props.data.Id}>
          <div className="cancel-mask" style={maskStyle}>
            <span
              className={"icon " + maskIconSrc}
              style={style.maskIcon} />
            <span style={style.cancelWord}>{maskText}</span>
            <span
              className="icon detail_icon"
              style={style.maskTurn} />
          </div>
        </Link>

        {jobTicket} 

        <div style={style.actionBox} className="actionBox">
          <div 
            style={style.contactBox}
            className="contactBox">
            <a href={"tel:" + this.props.data.Photographer.BusinessPhone}>
            <span
              className="icon phone_icon"
              style={{fontSize:22, color:'gray'}}
              ref="contactImage" />
            <div 
              style={style.buttonText} 
              ref="contactText" >联系</div>
              </a>
          </div>

          <Tappable 
            onTap={this.toggleCancelDialog}>
            <div
              style={style.cancelBox}
              className="cancelBox">
              <span 
                className="icon fail_icon"
                style={{fontSize:22, color:'gray'}}
                ref="cancelImage" />
              <div 
                style={style.buttonText} 
                ref="cancelText" >取消</div>
            </div>
          </Tappable>

        </div>

        {this.state.showCancelDialog ? <DocumentTitle title="取消订单" /> : ''}
          <div 
            style={this.state.showCancelDialog ?style.showCancelBookDialog:style.hide } >
            <div style={style.confirmHint} ref="confirmHint">您确认要取消这个订单吗？</div>
            <br />
            <div style={style.confirmTitle} ref="confirmTitle">预约订单信息</div>
            <div style={{overflow: 'hidden'}} >
              {jobTicket}
            </div>
            <div style={style.actionBar} className="actionBar">
              <Tappable 
                  onTap={this.cancelOrder}>
                <div style={style.cancelOrder} className="cancelOrder">
                  <span 
                    className="icon cancel_circle_icon"
                    style={{fontSize:55}}
                    ref="confirmImage" />
                  <div ref="confirmText">取消订单</div>
                </div>
              </Tappable>
              <Tappable 
                onTap={this.toggleCancelDialog}>
                <div style={style.cancelFrame} className="cancelFrame">
                  <span 
                    ref="cancelImage"
                    className="icon cancel_circle_icon"
                    style={{fontSize:55}} />
                  <div ref="cancelText">关闭</div>
                </div>
              </Tappable>
            </div>
          </div>
      </div>
    );
  }
});

module.exports = BookTicketRow;
