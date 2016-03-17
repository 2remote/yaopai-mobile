import React from 'react';

class WeuiNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: 0};
  }

  onOff (data, index) {
    this.setState({key: index});
    this.props.onClick(data);
  }

  render() {
    let result = this.props.list.map((data, index) =>
      <div
        onClick={() => this.onOff(data, index)}
        className={`weui_navbar_item ${index === this.state.key ? 'weui_bar_item_on' : ''}`}
        key={index}
      >
        <a href="javascript:;" alt={data.text}>{data.text}</a>{/* TODO: */}
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
