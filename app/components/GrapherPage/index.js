var React = require('react');
var Reflux = require('reflux');
let $ = require('jquery');
var DocumentTitle = require('react-document-title');
var HamburgMenu = require('../HamburgMenu');
var GrapherList = require('./GrapherList');
var PhotographerStore = require('../../stores/PhotographerStore');
var PhotographerActions = require('../../actions/PhotographerActions');
var AutoLoadPageMixin = require('../AutoLoadPageMixin');
import { TITLE } from '../Tools';
require('./GrapherPage.css');
import _ from 'underscore';
var WechatShare = require('../Weixin/WechatShare');
var Toaster = require('../Toast');

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
    this.onShowToast('努力加载中...')
    PhotographerActions.list(pageIndex);
  },
  render: function() {
    return (
      <DocumentTitle title={TITLE.grapherPage}>
        <div className="grapherPage">
          <HamburgMenu />
          <GrapherList data={this.state.graphers} />
          <WechatShare title={TITLE.grapherPage} desc={TITLE.indexPage}>
          </WechatShare>
          <Toaster ref="toast" bottom={true} duration="1000000"/>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = GrapherPage;