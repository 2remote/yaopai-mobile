import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import WeuiNavbarActions from '../../actions/ui/WeuiNavbarActions';
import WeuiNavbarStore from '../../stores/ui/WeuiNavbarStore';

class WeuiNavbarItem extends React.Component {
  setOn = (e) => {
    console.log('WeuiNavbarItem', this.props.data.text);
    WeuiNavbarActions.setOn(this.props.data.id);
  };
  render() {
    var text = this.props.data.text;
    var href = this.props.data.href;
    var tabId = this.props.data.id;
    return(
      <div onClick={this.setOn} className={`weui_navbar_item${this.state[tabId] ? ' weui_bar_item_on' : ''}`} key={this.props.index}>
        <a href={href} alt={text}>{text}</a>{/* TODO: */}
      </div>
    );
  }
}

ReactMixin.onClass(WeuiNavbarItem, Reflux.connect(WeuiNavbarStore));

class WeuiNavbar extends React.Component {
  render() {
    let result = this.props.list.map((data, index)=>{
      return (
        <WeuiNavbarItem data={data} key={index} isOn={index === 0}/>
      );
    });
    return(
      <div className="weui_navbar">
        {result}
      </div>
    );
  }
}

export { WeuiNavbar as default };