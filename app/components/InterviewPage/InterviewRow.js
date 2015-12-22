var React = require('react');
import { Router, Route, Link } from 'react-router';

import {imgModifier} from '../Tools';
import LazyLoad from 'react-lazy-load';

var InterviewRow = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
      }
    };
  },
  render: function() {

    const cover = imgModifier(this.props.data.Cover, "workCover");
    
    return (
      <div 
        style={{width:'100%',textAlign:'center',color:'#0f0f0f'}}
        className="interviewIntroGrapherRow">
        <Link to={"/interviewDetail/" + this.props.data.Id}>
          <div style={{width:'100%',height:210/375*innerWidth,marginBottom: -36,backgroundColor:'#eeedeb'}}>
            <LazyLoad threshold={100}>
              <img
                style={{width:'100%',height:210/375*innerWidth,marginBottom: -36}}
                ref="interviewImage"
                src={cover}/>
            </LazyLoad>
          </div>
        </Link>
      </div>
    );
  }
});

module.exports = InterviewRow;