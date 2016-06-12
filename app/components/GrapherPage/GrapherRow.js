import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';

import {imgModifier} from '../Tools';
import LazyLoad from 'react-lazy-load';

import PhotographerAlbumPoolAction from '../../actions/PhotographerAlbumPoolAction';
import PhotographerAlbumPoolStore from '../../stores/PhotographerAlbumPoolStore';

import { API_URL } from '../../api';
import $ from 'jquery';

var deviceWidth = parseInt(window.innerWidth);

var GrapherRow = React.createClass({
  mixins: [Reflux.connect(PhotographerAlbumPoolStore, 'photographerAlbumPool')],
  //onPhotographerStoreChange: function(data) {

  //},
  //onPhotographerAlbumPool: function(pool) {
  //  this.setState({
  //    photographerAlbumPool: pool,
  //  });
  //},
  getDefaultProps: function() {
    return {
      data: {

      }
    };
  },
  getInitialState: function() {
    return {};
  },

  componentWillMount : function() {
    if(!this.state.photographerAlbumPool[this.props.data.Id] && !this.state.already) {
      this.setState({
        already: true,
      });
      PhotographerAlbumPoolAction.update(this.props.data.Id);
      console.log('FETCH', this.props.data.Id);
    }
    //const id = this.props.data.Id;
    //const listWorkDetail = 'Albums.Search';
    //const fields = '&Fields=Id,Cut';
    //const filter = '&UserId='+id;
    //const url = API_URL + listWorkDetail + fields + filter;
    //if(id){
    //  $.ajax ({
    //    url: url,
    //    dataType: 'json',
    //    cache: false,
    //    success: function(data){
    //      this.setState({works:data});
    //      console.log(this.state);
    //    }.bind(this),
    //    error: function(xhr, status, err) {
    //      console.error(this.props.worksUrl, status, err.toString());
    //    }.bind(this)
    //  });
    //  console.log(id);
    //}
  },


  render: function() {

    const rondomAvatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(this.props.data.User.Id) % 47 + 1 ) + '.png';
    const grapherAvatar = imgModifier(this.props.data.Avatar||rondomAvatar, "grapherAvatar");
    let pool = this.state.photographerAlbumPool;
    let currentId = this.props.data.Id;
    let covers = this.state.photographerAlbumPool[currentId] || [];

    return (
      <div className="grapherRow">
        <Link to={"/grapherDetail/"+this.props.data.Id} >
          <div className="info">
            <div className="avatar" style={{
              backgroundImage:`url(${grapherAvatar})`,
            }} />
            <div className="grapher">
              <p>
                <span className="title">{this.props.data.NickName?this.props.data.NickName:'还没想好名字'}</span>
                <span className="dest"><i className="icon didian"></i>{this.props.data.CityName}</span>
              </p>
              <p className="sign">{this.props.data.Signature}</p>
            </div>
          </div>
          <div className="detail">
            <ul>
              <li>
                <i className="icon grid"></i>{this.props.data.TotalAlbums}套作品
              </li>
              <li>
                <i className="icon dingdan" style={{fontSize:'13px'}}></i> {this.props.data.Sales}个订单
              </li>
              <li>
                <i className="icon xiazai11" style={{fontSize:'14px'}}></i> {this.props.data.Marks}个关注
              </li>
            </ul>
          </div>
          <div className="pics">
            <ul>
              <li className="cover" style={{backgroundImage:`url(${covers[0]?covers[0].Cover:'/app/imgs/grapherPage/yaopai-bg.png'})`}}></li>
              <li className="cover" style={{backgroundImage:`url(${covers[1]?covers[1].Cover:'/app/imgs/grapherPage/yaopai-bg.png'})`}}></li>
              <li className="cover" style={{backgroundImage:`url(${covers[2]?covers[2].Cover:'/app/imgs/grapherPage/yaopai-bg.png'})`}}></li>
            </ul>
          </div>
        </Link>
      </div>
    );
  }
});

export {GrapherRow as default};