import React from 'react';
import YPUIPurseCard from '../../../../UI/YPUIPurseCard.jsx';

class PurseListLayout extends React.Component {
  render() {
    return (
      <div>
        <YPUIPurseCard />

        <aside
          style={{
            padding: '20px 15px 10px',
            fontSize: '12px'
          }}
          className="color_gray text_center">
          温馨提示：交易过程中如有异常<br />
          请拨打客服热线：0371-65337727
        </aside>
      </div>
    );
  }
}

export default PurseListLayout;