var React = require('react');
var DocumentTitle = require('react-document-title');
var HamburgMenu = require('../HamburgMenu');

const $ = require('jquery');

var GrapherIntro = require('./GrapherIntro');
var WorkIntroList = require('./WorkIntroList');
var ActionBar = require('./ActionBar');
import { API_URL } from '../../api';
import Share from '../Share';
import { TITLE } from '../Tools';

var GrapherDetailPage = React.createClass({
  getInitialState: function() {
    return {
      grapherInfo:{
        User: {
          NickName: '读取中...'
        }
      } 
    };
  },
  componentDidMount: function() {
    const id = this.props.params.Id;
    const grapherInfo = 'Photographer.Get';
    const listWorkDetail = 'Albums.Search';
    const fields = '&Fields=Id,User.NickName,CityName,User.Avatar';
    const filter = '&Id='+id;
    const url = API_URL + grapherInfo + fields + filter;
    
    $.ajax ({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({grapherInfo: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

    const worksUrl = API_URL + listWorkDetail + '&Fields=Id,Cover,Title' + '&UserId=' + id;

    if(id){
      $.ajax ({
        url: worksUrl,
        dataType: 'json',
        cache: false,
        success: function(data){
          this.setState({works: data.Result});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.worksUrl, status, err.toString());
        }.bind(this)
      });
    }
  },
  render: function() {
    let pageTitle = this.state.grapherInfo.User.NickName || '摄影师';
    return (
      <DocumentTitle title={TITLE.grapherDetailPage + pageTitle}>
        <div className="grapherDetailPage">
          <HamburgMenu />
          <GrapherIntro data={this.state.grapherInfo} />
          <WorkIntroList data={this.state.works}/>
          <ActionBar data={this.state.grapherInfo}/>
          <Share />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = GrapherDetailPage;
