import React from 'react';

class WeuiNavbarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false
    };
  }
  componentDidMount() {
    this.setState({isOn: this.props.isOn});
  }
  render() {
    var text = this.props.data.text;
    var href = this.props.data.href;
    return(
      <div className={`weui_navbar_item${this.state.isOn ? ' weui_bar_item_on' : ''}`} key={this.props.index}>
        <a href={href} alt={text}>{text}</a>{/* TODO: */}
      </div>
    );
  }
}

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