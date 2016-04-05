import React from 'react';
import {WhichFundsType} from '../Tools';

class YPUIPurseCard extends React.Component{
  render() {
    let fundsType = WhichFundsType(this.props.FundsType);
    return (
      <div className="YPUIPurseCard">
        <a
          className="Purse_box"
          href={`#/center/g/purse/detail/${this.props.FundsType}/${this.props.Id}`}
        >
          <div className="fl">
            <p>{fundsType}</p>
            {this.props.CreationTime.substring(0,10)}
          </div>
          <div className="fr">
            <p className={fundsType == '收入' ? 'color_green' : ''}>
              {this.props.Amount}
            </p>
            交易成功
          </div>
        </a>
      </div>
    );
  }
}

export default YPUIPurseCard ;