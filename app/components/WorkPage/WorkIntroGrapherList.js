var React = require('react');

var WorkIntroGrapherRow = require('./WorkIntroGrapherRow');

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
      <div className="workIntroGrapherList">
        {workNodes}
      </div>
    );
  }
});

module.exports = WorkIntroGrapherList;
