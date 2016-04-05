import React from 'react';
import Tappable from 'react-tappable';

var ExtraServiceBox = React.createClass({
  getDefaultProps: function() {
    return {
      services: ""
    };
  },

  getInitialState: function  () {
    return {
      showExtraService: false
    };
  },
  render: function() {
    const style={
      box:{
        marginTop:26,
        display:'block'
      },
      header:{
        color:'#3d7dca',
        fontSize:'1.2em'
      },
    };
    let showExtraService = this.state.showExtraService;
    return (
      
      <Tappable onTap={this.swapShowExtraService} 
        style={style.box}
        className="extraServiceBox" 
        >
        <div
          style={style.header}
          ref="extraHeader">包含服务</div>
        { showExtraService ? this.renderExtraSevice() : this.renderHint()}
      </Tappable>
    );
  },

  swapShowExtraService: function() {
    let state = this.state.showExtraService ? false : true;
    this.setState({showExtraService: state});
  },
// <Tappable onTap={this.swapShowExtraService}>
// </Tappable>);
  renderHint: function() {
    return ( 
      
        <div>（点击查看）</div> );
      
  },

  renderExtraSevice: function() {
    const style={
      hr:{
        borderTop: '1px solid #969696',
        margin:'12px 0'
      },
      box:{
        marginTop:26
      },
      text:{
        color:'#969696'
      }
    };
    return (
      <div>
        <div style={style.hr} />
        <div
          style={style.text} 
          ref="extraServices" >
            {this.props.services}
        </div>
      </div>
    );
  }
});

export {ExtraServiceBox as default};