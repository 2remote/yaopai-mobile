import React from 'react';


var AboutGrapher = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        Photographer: {
          Avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3156704277,4221589279&fm=96',
        }
      }
    };
  },
  render: function() {
    console.log('ag', this.props.data);
    return (
        <div className="grapher-panel">
            <div className="avatar" style={
            {backgroundImage:`url(${this.props.data.Photographer.Avatar})`,
            backgroundSize:'contain',
            height:'80px',
            width:'80px',
            borderRadius:'50%'}
            }>
            </div>
            <p className="uName">{this.props.data.Photographer.NickName}</p>
            <p className="uDes">YAOPAI认证摄影师</p>
        </div>
    );
  }
});

export {AboutGrapher as default};