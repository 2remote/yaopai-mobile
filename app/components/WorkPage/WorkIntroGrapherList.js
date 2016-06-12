import React from 'react';
import WorkIntroGrapherRow from './WorkIntroGrapherRow';

<<<<<<< HEAD
const WorkIntroGrapherList = ({data}) => (
  <div className="workIntroGrapherList">
    {
      data.map((work, i) =>
        <WorkIntroGrapherRow
          key={i}
          data={work}
        />
      )
    }
  </div>
);
=======
var WorkIntroGrapherList = React.createClass({
  getDefaultProps: function() {
    return {
      data: [
        {
          Cover: "imgs/default/work1.jpg",
          User: {
            NickName: "Ma Xiaochi",
            Avatar: "imgs/default/maxiaochi.jpg"
          },
          Title: "可以拍摄的水果"
        },
        {
          Cover: "imgs/default/work1.jpg",
          User: {
            NickName: "Ma Xiaochi",
            Avatar: "imgs/default/maxiaochi.jpg"
          },
          Title: "可以拍摄的水果"
        },
        {
          Cover: "imgs/default/work1.jpg",
          User: {
            NickName: "Ma Xiaochi",
            Avatar: "imgs/default/maxiaochi.jpg"
          },
          Title: "可以拍摄的水果"
        }
      ]
    };
  },

  render: function() {
    var workNodes = this.props.data.map(function(work, i){

      if(work.User !== null){
        console.log(i,work)
        return(
          <WorkIntroGrapherRow 
            key={i}
            data={work} />
        );  
      }else{
        console.warn('User data should not be null, checkout back-end database!');
      }
      
    });

    return (
      <div className="workIntroGrapherList" style={{marginTop:49}}>
        {workNodes}
      </div>
    );
  }
});
>>>>>>> add-grapher-css

export default WorkIntroGrapherList;
