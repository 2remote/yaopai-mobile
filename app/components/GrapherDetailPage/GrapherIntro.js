import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import PhotographerActions from '../../actions/PhotographerActions';
import PhotographerStore from '../../stores/PhotographerStore';
import { ButtonAttention } from '../UI/Button';
import {imgModifier} from '../Tools';

class GrapherIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isClickMark: false,
      markExist: false,
    }
    this.attention = this.attention.bind(this)
    this.unAttention = this.unAttention.bind(this)
  }

  componentWillMount() {
    PhotographerActions.get(this.props.id)
  }

  onGetSuccess(data) {
    this.setState({
      data: data.photographer,
      // markExist: data.photographer.MarkExist,
    })
  }

  // 关注
  attention() {
    this.setState({isClickMark: true})
    // TODO 如何防止用户多次提交
    PhotographerActions.mark(this.props.id)
  }
  // 取消关注
  unAttention() {
    this.setState({isClickMark: true})
    // TODO 如何防止用户多次提交
    // confirm('确定取消关注吗')
    PhotographerActions.unMark(this.props.id)
  }

  onMarkSuccess(data){
    console.log(data.markExist)
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
    console.log(this.state.markExist)
    console.log(this.state.isClickMark)
    console.log(data.MarkExist)
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
export {GrapherIntro as default};
