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
    return(
      <div className={`weui_navbar_item${this.state.isOn ? ' weui_bar_item_on' : ''}`} key={this.props.index}>
        {this.props.text}
      </div>
    );
  }
}

class WeuiNavbar extends React.Component {
  render() {
    let result = this.props.list.map((text, index)=>{
      return (
        <WeuiNavbarItem text={text.text} key={index} isOn={index === 0}/>
      );
    });
    return(
      <div className="weui_tab">
        <div className="weui_navbar">
          {result}
        </div>
        <div className="weui_tab_bd">
        </div>
      </div>
    );
  }
}

export { WeuiNavbar as default };