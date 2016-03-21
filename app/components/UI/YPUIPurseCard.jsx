import React from 'react';

class YPUIPurseCard extends React.Component{
  render() {
    return (
      <div className="YPUIPurseCard">
        <section className="Purse_box">
          <div className="fl">
            <p>收入</p>
            2015-12-12&nbsp;21:11:10
          </div>
          <div className="fr">
            <p className="color_green">+1267.00</p>
            交易成功
          </div>
        </section>

        <section className="Purse_box">
          <div className="fl">
            <p>补偿</p>
            2015-12-12&nbsp;21:11:10
          </div>
          <div className="fr">
            <p>+1267.00</p>
            交易成功
          </div>
        </section>

        <section className="Purse_box">
          <div className="fl">
            <p>提现</p>
            2015-12-12&nbsp;21:11:10
          </div>
          <div className="fr">
            <p>-1267.00</p>
            交易成功
          </div>
        </section>
      </div>
    );
  }
}

export default YPUIPurseCard ;