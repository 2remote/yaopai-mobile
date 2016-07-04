import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import PhotographerActions from '../../actions/PhotographerActions';
import PhotographerStore from '../../stores/PhotographerStore';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import { ButtonAttention } from '../UI/Button';
import {imgModifier} from '../Tools';
import Toaster from '../Toast';
import WechatShare from '../Weixin/WechatShare'
import DocumentTitle from 'react-document-title'

class GrapherIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData : {},
      data: {},
      isClickMark: false,
      markExist: false,
      marks: 0,
    }
    this.attention = this.attention.bind(this)
    this.unAttention = this.unAttention.bind(this)
  }

  componentWillMount() {
    PhotographerActions.get(this.props.id)
    UserActions.currentUser()
  }
  // 获取登录信息
  onUserLoad(userData) {
    this.setState({ userData })
  }

  // 获取摄影师基本信息
  onGetSuccess(data) {
    this.setState({
      data: data.photographer,
      // markExist: data.photographer.MarkExist,
    })
  }

  // 点击关注
  attention() {
    if(!this.state.userData.isLogin){ // 用户未登录
      const confirmMsg = confirm("是否前往登录，然后关注？");
      if (confirmMsg == true) {
        this.history.pushState({nextPage : this.props.pathname},'/login_page');
      }

    } else if(this.state.userData.UserId == this.props.id) {
      this.showMessage('您不能关注自己');
      return;

    } else {
      this.setState({isClickMark: true})
      // TODO 如何防止用户多次提交
      PhotographerActions.mark(this.props.id)
      this.setState({
        marks: 1,
      })
    }
  }
  // 点击取消关注
  unAttention() {
    this.setState({isClickMark: true})
    // TODO 如何防止用户多次提交
    // confirm('确定取消关注吗')
    PhotographerActions.unMark(this.props.id)
    this.setState({
      marks: 0,
    })
  }

  onMarkSuccess(data){
    if (data.markExist.id == this.props.id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }

  onUnMarkSuccess(data){
    if (data.markExist.id == this.props.id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }

  showMessage (content) {
    this.refs.toast.show(content)
  }

  render() {
    const {data} = this.state
    const title = this.state.NickName || '摄影师'
    const wechatShareTitle = 'YAOPAI 认证摄影师-' + data.NickName
    const wechatShareDesc = data.NickName + ':' + data.Signature
    return (
      <section className="grapherIntro">
        <DocumentTitle title={title} />
        <WechatShare title={wechatShareTitle} desc={wechatShareDesc} imgUrl={data.Avatar} />
        <Toaster ref="toast"/>

        <div className="baseInfo">
          <div className="avatar" style={{backgroundImage:`url('${data.Avatar}')`}} />
          <p className="nickname">{data.NickName}</p>
          <p className="font_small">{data.Signature}</p>
          <p className="font_small"><i className="icon didian"></i>{data.CityName}</p>
          {
            (this.state.isClickMark ? this.state.markExist : data.MarkExist)
            ?
            <ButtonAttention
              buttonType="btn-dark"
              value="已关注"
              handleSubmit={this.unAttention}
              iconType="mark_active"
            />
            :
            <ButtonAttention
              buttonType="btn-dark"
              value="关注我"
              handleSubmit={this.attention}
              iconType="mark"
            />
          }
        </div>
        <div className="order">
          <ul>
            <li><span className="count">{data.TotalAlbums}</span>作品</li>
            <li><span className="count">{data.Sales}</span>订单</li>
            {
              data.Marks !== undefined?
              <li><span className="count">{data.Marks + this.state.marks}</span>关注</li>
              :
              null
            }
          </ul>
        </div>
      </section>
    );
  }
};

ReactMixin.onClass(GrapherIntro,Reflux.listenTo(PhotographerStore, 'onMarkSuccess'));
ReactMixin.onClass(GrapherIntro,Reflux.listenTo(PhotographerStore, 'onUnMarkSuccess'));
ReactMixin.onClass(GrapherIntro, Reflux.listenTo(PhotographerStore, 'onGetSuccess'));
ReactMixin.onClass(GrapherIntro, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(GrapherIntro, History);

export {GrapherIntro as default};
