import React from 'react';

import { Link, History,Location } from 'react-router';

export default class SidePageIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style={
      sidePage:{
        boxShadow: 'inset -2px 0px 16px 4px #C9C9C9',
        paddingRight: '14%',
        height: '100%',
        overflow: 'scroll',
        textAlign: 'center'
      },
      loginBox: {
        position: 'relative',
      },
      logout:{
        position: 'absolute',
        top: '58px',
        right: '0px'
      },
      loginName: {
        marginBottom: '15px',
      },
      link:{
        lineHeight: '14px',
        paddingBottom: '15px',
        display: 'block'
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
        borderTop:'1px solid #c9c9c9',
        margin:'0 0 0 10%'
      },
      commonIcon: {
        marginTop: '15px',
      },
    };

    return(
      <div >
        <div style={style.spliterLine} className="spliterLine" />

        <Link style={style.link} to={this.props.to || `/${this.props.name}`} >
          <img  style={style.commonIcon} ref="interviewIcon" 
            src={`imgs/sidePage/${this.props.name}-icon.png`}
            srcSet={`imgs/sidePage/${this.props.name}-icon@2X.png 2x`} />
          <div>{this.props.text}</div>
        </Link>
      </div>
    );
  }
}
