import React from 'react';

import { Link, History,Location } from 'react-router';

export default class SidePageIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style={
      sidePage:{
        height: '100%',
        overflow: 'scroll',
        textAlign:'center',
        fontSize:'12px',
      },
      loginBox: {
        position: 'relative'
      },
      logout:{
        position: 'absolute',
        top: '58px',
        right: '0px'
      },
      loginName: {
        marginBottom: '16px'
      },
      link:{
        lineHeight: '60px',
        display: 'block',
        color:'#5c5c5c'
      },
      avatar:{
        margin: '34px 0 19px',
        fontSize:'55px'
      },
      loginIcon:{
        float: 'right',
        margin: '51px 15px 0 -53px'
      },
      spliterLine:{
        borderTop:'1px solid #2b2b2b',
        margin:'0 0 0 30%'
      },
      commonIcon: {
        marginTop: '15px'
      },
      icon: {
        color:'#5c5c5c',
        fontSize:'20px',
        textAlign:'center',
        display:'inline-block',
        height:'60px',
        lineHeight:'60px',
        width:'40%'
      },
      text:{
        textAlign:'left',
        display:'inline-block',
        height:'60px',
        lineHeight:'60px',
        width:'60%'
      }
    };

    return(
      <div >
        <Link style={style.link} to={this.props.to || `/${this.props.name}`} >
          <div>
            <span style={style.icon}>
              <i className={'icon '+ this.props.icon}></i>
            </span>
            <span style={style.text}>
              {this.props.text}
            </span>
          </div>
        </Link>
        <div style={style.spliterLine} className="spliterLine" />
      </div>
    );
  }
}
