import React from 'react';


var AboutYAOPAI = React.createClass({
  getDefaultProps: function() {
    return {
      data: {

      }
    };
  },
  render: function() {
    return (
        <div className="aboutYAOPAI">
          <hr className="moreWork"/>
          <span className="des">服务保障</span>
          <ul>
            <li>
              <i className="icon pinzhi" style={{fontSize:'45px'}}></i>
              <div className="info">
                <p>摄影师品质保证</p>
                <span>为您提供服务的摄影师，是YAOPAI从专业性、服务态度等各个维度为您精心挑选的。</span>
              </div>
            </li>
            <li>
              <i className="icon anquan1" style={{fontSize:'45px'}}></i>
              <div className="info">
                <p>平台支付担保</p>
                <span>YAOPAI为您全程担保，确认收片后您的消费款项才转给摄影师，保证您得到高品质的服务。</span>
              </div>
            </li>
            <li>
              <i className="icon llscanorderlisticon"></i>
              <div className="info">
                <p>没有隐形消费</p>
                <span>服务内容及价格明细都会在您付款前确认，不会在拍摄过程中进行任何形式的二次消费。</span>
              </div>
            </li>
            <li>
              <i className="icon pingjia"></i>
              <div className="info">
                <p>真实客片和评价</p>
                <span>展示照片100%为真实客片，每条评价均来自真实客户，为您提供最有用的决策参考。</span>
              </div>
            </li>
          </ul>
        </div>
    );
  }
});

export {AboutYAOPAI as default};