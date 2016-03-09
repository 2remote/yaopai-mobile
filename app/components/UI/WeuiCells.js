import React from 'react';

/**
 * weui-cells的React组件
 * @param cellList: 包含该weui-cells下的每条cell数据,这些数据包含:
 *   icon: cell左侧图标,此处仅支持icon-font
 *   title: cell左侧标题
 *   money: cell右侧金额,颜色为red,单位为¥
 *   href: cell跳转地址(React Router的地址)
 */
class WeuiCells extends React.Component {
  render() {
    let result = this.props.cellList.map((cell, index)=>{
      return (
        <a className="weui_cell" href={`#${cell.href}`} key={index}>
          <div className="weui_cell_hd">
            <i className={`icon ${cell.icon}`} />&nbsp;
          </div>
          <div className="weui_cell_bd weui_cell_primary">
            <p>{cell.title}</p>
          </div>
          <div className="weui_cell_ft">
            {
              !cell.money || (<span style={{color:'red'}}>¥&nbsp;{cell.money}</span>)
            }
          </div>
        </a>
      );
    });
    return(
      <div className="weui_cells weui_cells_access">
        {result}
      </div>
    );
  }
}

export { WeuiCells as default };