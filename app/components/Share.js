import React from 'react';

export default class Share extends React.Component {
  state = {
    showShareGuide: false,
  }
  handleShare() {
    this.setState({
      showShareGuide : !this.state.showShareGuide
    });
  }
  render() {
    return(
      <div 
        onClick={ this.handleShare.bind(this) }
        style={ {position: 'fixed', right: 10, bottom: '14%'} }>
        <span
          className="icon share_icon"
          ref="shareIcon"
          style={ {fontSize:40} } />
        <div
          style={ this.state.showShareGuide ? {display:'block'} : {display:'none'} }>shareGuide</div>
      </div>
    );
  }
}
