import React from 'react';
import Reflux from 'reflux';
import $ from 'jquery';
import DocumentTitle from 'react-document-title';
import SidePage from '../UI/SidePage';
import GrapherList from './GrapherList';
import PhotographerStore from '../../stores/PhotographerStore';
import PhotographerActions from '../../actions/PhotographerActions';
import AutoLoadPageMixin from '../AutoLoadPageMixin';
import { TITLE } from '../Tools';
import './GrapherPage.scss'
import _ from 'underscore';
import WechatShare from '../Weixin/WechatShare';
import Toaster from '../Toast';
import ShowMenu from './ShowMenu';

var GrapherPage = React.createClass({
  mixins : [Reflux.listenTo(PhotographerStore,'_onPhotographerStoreChange') ,AutoLoadPageMixin],
  getInitialState: function() {
    return {
      pageIndex : 1,
      pageCount :0,
      graphers: []
    };
  },
  componentDidMount: function() {
    //this.handleLoadGraphers(this.props.url);
    PhotographerActions.list();

  },
  _onPhotographerStoreChange : function(data){
    if(data.flag == 'list'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({
          graphers: this.state.graphers.concat(_.shuffle(data.photographers)),
          pageCount: data.pageCount
        });
        this.onHideToast()
      }
    }
  },
  onChangePage : function (pageIndex) {
    this.onShowToast('努力加载中...');
    PhotographerActions.list(pageIndex);
  },
  render: function() {
    var cities = [];
    var catas = [];

    return (
      <DocumentTitle title={TITLE.grapherPage}>
        <div className="grapherPage">
          <SidePage />
          <ShowMenu
            tagsInUrl={this.props.params.tag}
            cities={cities}
            catas={catas}
            onSelectedTag={this.handleUpdateTags}
            onSearch = {this.handleUpdateSearch}
          />
          <GrapherList data={this.state.graphers} />
          <WechatShare title={TITLE.grapherPage} desc={TITLE.indexPage} />
          <Toaster ref="toast" bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});

export {GrapherPage as default};
