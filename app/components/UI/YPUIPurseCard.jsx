import React from 'react';

class YPUIPurseCard extends React.Component{
  render() {
    let fundsType = "";
    switch (this.props.FundsType) {
      case "Completed":
        fundsType = "全部";
        break;
      case "order" :
        fundsType = "收入";
        break;
      case "Compensative" :
        fundsType = "补偿";
        break;
      case "Withdrew" :
        fundsType = "提现";
        break;
    }
    return (
      <div className="YPUIPurseCard">
        <section className="Purse_box">
          <div className="fl">
            <p>{fundsType}</p>
            {this.props.CreationTime}
          </div>
          <div className="fr">
            <p className="color_green">{this.props.Amount}</p>
            交易成功
          </div>
        </section>
      </div>
    );
  }
}

export default YPUIPurseCard ;