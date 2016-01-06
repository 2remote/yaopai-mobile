var React = require('react');
var Reflux = require('reflux');
let $ = require('jquery');
var DocumentTitle = require('react-document-title');
var HamburgMenu = require('../HamburgMenu');
var GrapherList = require('./GrapherList');
var PhotographerStore = require('../../stores/PhotographerStore');
var PhotographerActions = require('../../actions/PhotographerActions');
var AutoLoadPageMixin = require('../AutoLoadPageMixin');
require('./GrapherPage.css');
import _ from 'underscore';

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
      }
    }
  },
  onChangePage : function (pageIndex) {
    PhotographerActions.list(pageIndex);
  },
  render: function() {
    return (
      <DocumentTitle title="摄影师">
        <div className="grapherPage">
          <HamburgMenu />
          <GrapherList data={this.state.graphers} />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = GrapherPage;
