import React from 'react';
import UserMarkLayout from './UserMarkLayout';
import { RouteTransition, presets } from 'react-router-transition'

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import AlbumsActions from '../../actions/AlbumsActions';
import AlbumsStore from '../../stores/AlbumsStore';

class UserCollectList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      works: [],
    }
  }

  componentWillMount() {
    // 蛋疼的传参
    // 查询当前用户已收藏作品
    AlbumsActions.search(null, "", null, null, null, true);
  }

  onSearchSuccess(data) {
    this.setState({
      works: data.workList,
    })
  }

  render() {
    let CollectRow = <div></div>
    if (!this.state.works.length) {
      CollectRow = <div>你还没有关注过摄影师</div>
    } else {
      CollectRow = this.state.works.map((data, i) => (
        <section className="collect-row" key={i}>
          <div className="media-hd">
            <span
              style={{background: `url(${data.Cover}) no-repeat`, backgroundSize: 'cover'}}
              className="media-work"
            />
          </div>
          <div className="media-bd">
            <div className="media-header">
              <p className="media-title fl">{data.Title}</p>
              <span className="media-city fr">
                {data.Photographer.CityName.substring(0, data.Photographer.CityName.length - 1)}
              </span>
            </div>
            <p className="media-desc">{data.Description}</p>
            <p className="media-price">{data.Prace}</p>
          </div>
        </section>
      ))
    }

    return(
      <section className="collect-list">
        <UserMarkLayout />
        <RouteTransition { ...presets.slideLeft } pathname="/center/mark/user_collect">
          {CollectRow}
        </RouteTransition>
      </section>
    )
  }
}

ReactMixin.onClass(UserCollectList, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'));
export default UserCollectList
