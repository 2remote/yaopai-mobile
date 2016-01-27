import React from 'react';

export default class Share extends React.Component {
  state = {
    showShareGuide: false,
  }
  handleShare() {
    this.setState({
      showShareGuide: !this.state.showShareGuide,
    });
  }
  render() {
    var imgStyle = { 
      width: '100%',
      height: '101%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999,
      backgroundColor: 'black',
      opacity: 0.8,
    }
    return(
      <div 
        onClick={ this.handleShare.bind(this) }
        style={ {position: 'fixed', right: 10, bottom: '14%'} }>
        <span
          className="icon default_avatar"
          ref="shareIcon"
          style={ {fontSize:40} } />
        <div style={ this.state.showShareGuide ? {display:'block'} : {display:'none'} }>
          <img src="../imgs/common/share-guide.jpg" style={imgStyle} />
        </div>
      </div>
    );
  }
}
