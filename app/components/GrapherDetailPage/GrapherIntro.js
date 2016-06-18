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
      mark: false,
      unMark: false,
    }
    this.attention = this.attention.bind(this)
    this.unAttention = this.unAttention.bind(this)
  }
  // 关注
  attention() {
    alert('关注成功')
    PhotographerActions.mark(this.props.data.Id)
  }
  // 取消关注
  unAttention() {
    confirm('确定取消关注吗')
    PhotographerActions.unMark(this.props.data.Id)
  }

  onMarkSuccess(data){
    this.setState({
      mark: data.mark,
    });
  }
  render() {
    const {data, from} = this.props;
    let avatarSoruce = data.User ? avatarSoruce = data.Avatar : null;

    let name = '读取中...';
    if ( typeof data.User !== 'undefined'){
      name = data.NickName;
    }

    let cityName = data.CityName;

    if(from === 'interview' && data){
      name = data.NickName;
    };
    console.log(data.MarkExist)
    return (
      <section className="grapherIntro">
        <div className="baseInfo">
          <div className="avatar" style={{backgroundImage:`url('${data.Avatar}')`}} />
          <p className="nickname">{name}</p>
          <p className="font_small">{data.Signature}</p>
          <p className="font_small"><i className="icon didian"></i>{cityName}</p>
          {
            data.MarkExist
            ?
            <ButtonAttention
              buttonType="btn-dark btn-attention-active"
              value="已关注"
              handleSubmit={this.unAttention}
            />
            :
            <ButtonAttention
              buttonType="btn-dark"
              value="关注我"
              handleSubmit={this.attention}
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
      </section>
    );
  }
};

ReactMixin.onClass(
  GrapherIntro,
  [
    Reflux.listenTo(PhotographerStore, 'onMarkSuccess'),
    Reflux.listenTo(PhotographerStore, 'onUnMarkSuccess')
  ]
);
export {GrapherIntro as default};
