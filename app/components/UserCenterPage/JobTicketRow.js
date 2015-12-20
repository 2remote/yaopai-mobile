var React = require('react');
var Tappable = require('react-tappable');
var DocumentTitle = require('react-document-title');
var OrderActions = require('../../actions/OrderActions');

import { Link, History,Location } from 'react-router';

// import ConfirmBookDialog from './ConfirmBookDialog';
import BookTicketRow from './BookTicketRow';
import {dateFormat} from '../Tools'
var JobTicketRow = React.createClass({
  mixins :[History],
  getDefaultProps: function() {
    return {
      data: {}
    };
  },

  getInitialState: function() {
    return {
      showConfirmDialog: false
    };
  },

  handleClick: function(e){
    e.preventDefault();
    // 提交修改后的日期数据
  },

  toggleConfirmDialog: function() {
    var state = this.state.showConfirmDialog ? false : true;
    this.setState({showConfirmDialog: state});
  },
  confirm : function () {
    var newDate = new Date(this.refs.userBookDate.value);
    var now = new Date();
    now = new Date(dateFormat(now,'yyyy-MM-dd'));
    if(newDate < now){
      console.log('不能预定之前的日期！');
      return ;
    }
    OrderActions.confirm(this.props.data.Id,this.refs.userBookDate.value);
    this.toggleConfirmDialog();
    this.history.pushState(null,'/viewOrder/p/'+this.props.data.Id);
  },
  render: function() {
    let deviceHeight = parseInt(window.innerHeight);
    let heightRatio = deviceHeight/627;
    let rondomAvatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(this.props.data.UserId) % 47 + 1 ) + '.png';
    var style = {
      row: {
        clear: 'both',
        height: 165,
        position: 'relative',
      },
      jobTicket: {
        backgroundImage: this.state.showConfirmDialog? 'url(imgs/userCenterPage/book-success-ticket-bk.png)': 'url(imgs/userCenterPage/book-ticket-bk.png)',
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
        fontSize: 55,
        color: 'red'
      },
      maskTurn: {
        float: 'right',
        marginTop: '4px',
        fontSize: 25,
        color: 'gray'
      },
      hide: {
        display: 'none',
      },
      avatar: {
        width: 66,
        height: 66,
        margin: '16.5px 0 3px 0'
      },
      userName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: 66,
        position: 'absolute',
        marginLeft: -10
      },
      box: {
        borderRight: '#DADADA 1px solid',
        height: 125,
        margin: '12.5px 0 auto',
        float: 'left',
        padding: '0 7.348243% 0 8.306709%'
      },
      label: {
        fontSize: .833333333 + 'em',
        color: '#909090'
      },
      userInfo: {
        color: '#6b6b6b'
      },
      inputStyle: {
        padding: '1px 0',
        backgroundColor: 'inherit',
        width: 82,
        borderWidth: '0 0 2px',
        borderRadius: 0,
        borderColor: 'transparent transparent #c4c4c4',
        color: '#6b6b6b'
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
        fontSize: 25
      },
      actionBox: {
        float: 'right',
        width: '16.5%',
        position: 'relative',
        height: 150
      },
      userInfoBox: {
        height: 121.5,
        margin: '12.5px 7.667732% auto 36.741214%',
        WebkitBorderImage: 'url(imgs/userCenterPage/book-dash.png) 0 2',
        borderImage: 'url(imgs/userCenterPage/book-dash.png) 0 2',
        borderWidth: '0 1px 0 0',
        textAlign: 'left',
        padding: '3.5px 0 0 7.667732%'
      },
      confirmBox: {
        position: 'absolute',
        bottom: 14,
        right: '28.6885246%',
        padding: '9px 17px',
        margin: '-9px -17px',
      },
      editBox: {
        position: 'absolute',
        top: 17,
        right: '28.6885246%',
        padding: '9px 17px',
        margin: '-9px -17px',
      },
      buttonText: {
        fontSize: .666666667+'em',
        color: '#909090',
        marginTop: -3,
        height: '20px',
        lineHeight: '20px'
      },
      confirmBookDialog: {
        display: 'none',
      },
      
      confirmHint: {

      },
      confirmTitle: {
        fontSize:'1.666666667em',
        marginBottom: 48*heightRatio
      },
      confirmBox1: {
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
      showConfirmBookDialog: {
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
    
    if (this.props.data.State === 2){
      maskText ='订单取消';
      maskIconSrc = ' fail_icon ';
    }  
    if (this.props.data.State === 1){
      maskText = '订单成功';
      maskIconSrc = ' success_icon ';
    }

    var jobTicket = (
      <div style={style.jobTicket} className="jobTicket">
        <div 
          style={style.box}
          className="userBox">
          <img 
            style={style.avatar}
            ref="userAvatar"
            src={this.props.data.User.Avatar || rondomAvatar} />
          <div 
            style={style.userName}
            ref="userName" >{this.props.data.User.NickName}</div>
        </div>

        
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
            { this.state.showConfirmDialog ? 
              <input 
                style={style.inputStyle} 
                ref="userBookDate" 
                type="date" 
                defaultValue={dateFormat(new Date(this.props.data.AppointedTime),'yyyy-MM-dd')}/> :
              <span style={style.userInfo} ref="userBookDate" >{this.props.data.AppointedTime.slice(0,10)}</span> 
            }
          </div>
          <div >
            <span style={style.label} ref="suggestPriceLabel" >参考金额：</span>
            <span style={style.userInfo} ref="suggestPrice" >{this.props.data.IsSpecifiesAlbums?this.props.data.Price:'面议'}</span>
            <Link style={style.link} to={"/viewOrder/p/"+this.props.data.Id}>
              <span
                className="icon detail_icon"
                style={style.toDetial} />
            </Link>
          </div>
        </div>
      </div>
    );
    return (
      <div 
        style={style.row}
        className="jobTicketRow">

        <Link to={"/viewOrder/p/"+this.props.data.Id}>
          <div className="cancel-mask" style={maskStyle}>
            <span
              className={"icon" + maskIconSrc}
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
            style={style.editBox}
            className="editBox">
            <a href={"tel:" + this.props.data.BuyerTel}>
            <span 
              className="icon contact_icon"
              style={{fontSize:55}}
              ref="editImage" />
            <div style={style.buttonText} ref="editText" >{this.props.data.State===0?'联系':this.props.data.State===1?'已完成':'已关闭'}</div>
            </a>
          </div>

          <Tappable 
            onTap={this.toggleConfirmDialog}>
            <div 
              style={style.confirmBox}
              className="confirmBox">
              <span 
                className="icon confirm_icon"
                ref="confirmImage"
                style={{fontSize:55}} />
                
              <div style={style.buttonText} ref="confirmText" >确认</div>
            </div>
          </Tappable>

        </div>

        <DocumentTitle title="个人中心">
          <div 
            style={this.state.showConfirmDialog ?style.showConfirmBookDialog:style.confirmBookDialog }
            className="confirmBookDialog">
            <div style={style.confirmHint} ref="confirmHint">请您再次确认预约信息，核对拍摄时间！</div>
            <br />
            <div style={style.confirmTitle} ref="confirmTitle">确认预约信息</div>
            <div style={{overflow: 'hidden'}} confirm={true}>
            {jobTicket}
            </div>
            <div style={style.actionBar} className="actionBar">
              <Tappable 
                  onTap={this.confirm}>
                <div style={style.confirmBox1} className="confirmBox">
                  <span 
                    className="icon confirm_circle_icon"
                    ref="confirmImage"
                    style={{fontSize:55}} />
                    
                  <div ref="confirmText">确定</div>
                </div>
              </Tappable>
              <Tappable 
                onTap={this.toggleConfirmDialog}>
                <div style={style.cancelFrame} className="cancelFrame">
                  <span 
                    className="icon cancel_circle_icon"
                    ref="cancelImage"
                    style={{fontSize:55}} />
                    
                  <div ref="cancelText">取消</div>
                </div>
              </Tappable>
            </div>
          </div>
        </DocumentTitle>

      </div>
    );
  }
});

module.exports = JobTicketRow;