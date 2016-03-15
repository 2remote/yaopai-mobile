import React from 'react';
import WeuiNavbarActions from '../../actions/ui/WeuiNavbarActions';
import WeuiNavbarStore from '../../stores/ui/WeuiNavbarStore';

class WeuiNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: 0};
  }

  onOff (index) {
    this.setState({key: index});
	  this.props.onClick(index);
  }

  render() {
    let result = this.props.list.map((data, index) =>
      <div
        onClick={() => this.onOff(index)}
        className={`weui_navbar_item ${index === this.state.key ? 'weui_bar_item_on' : ''}`}
      >
        <a href={data.href} alt={data.text}>{data.text}</a>{/* TODO: */}
      </div>
    );
    return(
      <div className="weui_navbar tab_select">
        {result}
      </div>
    );
  }
}

export { WeuiNavbar as default };
