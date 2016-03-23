import React from 'react';
import {WhichFundsType} from '../Tools';

class YPUIPurseCard extends React.Component{
  render() {
    let fundsType = WhichFundsType(this.props.FundsType);
    /*let fundsType = "";
    switch (this.props.FundsType) {
      case "Order" :
        fundsType = "收入";
        break;
      case "Compensative" :
        fundsType = "补偿";
        break;
      case "Withdrew" :
        fundsType = "提现";
        break;
    }*/
    return (
      <div className="YPUIPurseCard">
        <section className="Purse_box">
          <div className="fl">
            <p>{fundsType}</p>
            {this.props.CreationTime}
          </div>
          <div className="fr">
            <p className={fundsType == '收入' ? 'color_green' : ''}>
              {this.props.Amount}
            </p>
            交易成功
          </div>
        </section>
      </div>
    );
  }
}

export default YPUIPurseCard ;