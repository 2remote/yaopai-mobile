import React from 'react';
import { Link } from 'react-router';

import UserMarkLayout from './UserMarkLayout';
import { RouteTransition, presets } from 'react-router-transition'
import {imgModifier} from '../Tools';

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import PhotographerActions from '../../actions/PhotographerActions';
import PhotographerStore from '../../stores/PhotographerStore';

class UserAttentionList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      photoGraphers: [],
    }
  }

  componentWillMount() {
    // 蛋疼的传参
    // 查询当前用户已关注摄影师
    PhotographerActions.query(null, null, null, true);
  }

  onQuerySuccess(data) {
    this.setState({
      photoGraphers: data.photographers,
    })
  }

  render() {
    let AttentionRow = <div></div>
    if (!this.state.photoGraphers.length) {
      AttentionRow = <div className="nothing-found">你还没有关注过摄影师：）</div>
    } else {
      AttentionRow = this.state.photoGraphers.map((data, i) => (
        <section
          className="attention-row"
          key={i}
          onClick={() => this.props.history.replaceState(null,`grapherDetail/${data.Id}`)}
        >

          <div
            className="media-hd"
            style={{backgroundImage:`url('${data.Avatar}')`, backgroundSize: 'cover'}}
          />
          <div className="media-bd">
            <div className="media-header">
              <p className="media-title fl">{data.NickName}</p>
              <span className="media-city fr">
                {data.CityName.substring(0, data.CityName.length - 1)}
              </span>
            </div>
            <p className="media-desc">{data.Signature}</p>
          </div>
        </section>
      ))
    }

    return(
      <section className="attention-list">
        <UserMarkLayout />
        <RouteTransition { ...presets.slideRight } pathname="/center/mark/user_attention">
          {AttentionRow}
        </RouteTransition>
      </section>
    )
  }
}

ReactMixin.onClass(UserAttentionList, Reflux.listenTo(PhotographerStore, 'onQuerySuccess'));
export default UserAttentionList
