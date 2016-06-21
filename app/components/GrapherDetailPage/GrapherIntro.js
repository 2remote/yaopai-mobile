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

class GrapherIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData : {},
      data: {},
      isClickMark: false,
      markExist: false,
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
      const confirmMsg = confirm("是否前往登录，然后收藏？");
      if (confirmMsg == true) {
        this.history.pushState({nextPage : this.props.pathname},'/login_page');
      } else {

      }

    } else {
      this.setState({isClickMark: true})
      // TODO 如何防止用户多次提交
      PhotographerActions.mark(this.props.id)
    }
  }
  // 点击取消关注
  unAttention() {
    this.setState({isClickMark: true})
    // TODO 如何防止用户多次提交
    // confirm('确定取消关注吗')
    PhotographerActions.unMark(this.props.id)
  }

  onMarkSuccess(data){
    this.setState({markExist: data.markExist})
  }
  /* onMarkSuccess(data) 就够了，不需要 onUnMarkSuccess(data）,因为在 PhotographerStore.js 里，
   * onMarkSuccess、onUnMarkSuccess 改变的是同一个值 markExist
   */
  // onUnMarkSuccess(data){
  //   this.setState({markExist: data.markExist})
  // }
  render() {
    const {data} = this.state
    return (
      <section className="grapherIntro">
        <div className="baseInfo">
          <div className="avatar" style={{backgroundImage:`url('${data.Avatar}')`}} />
          <p className="nickname">{data.NickName}</p>
          <p className="font_small">{data.Signature}</p>
          <p className="font_small"><i className="icon didian"></i>{data.CityName}</p>
          {
            (this.state.isClickMark ? this.state.markExist : data.MarkExist)
            ?
            <ButtonAttention
              buttonType="btn-dark btn-attention-active"
              value="已关注"
              handleSubmit={this.unAttention}
              iconType="attention_active"
            />
            :
            <ButtonAttention
              buttonType="btn-dark"
              value="关注我"
              handleSubmit={this.attention}
              iconType="attention"
            />
          }
        </div>
        <div className="order">
          <ul>
            <li><span className="count">{data.TotalAlbums}</span> 作品</li>
            <li><span className="count">{data.Sales}</span> 订单</li>
            <li><span className="count">{data.Marks}</span> 关注</li>
          </ul>
        </div>
        {data.TotalAlbums ? '' : <p className="text_center">该摄影师暂未上传作品！</p>}
      </section>
    );
  }
};

ReactMixin.onClass(GrapherIntro,Reflux.listenTo(PhotographerStore, 'onMarkSuccess'));
ReactMixin.onClass(GrapherIntro, Reflux.listenTo(PhotographerStore, 'onGetSuccess'));
ReactMixin.onClass(GrapherIntro, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(GrapherIntro, History);

export {GrapherIntro as default};
