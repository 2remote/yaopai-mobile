import React, { PropTypes } from 'react'
/**
* @param: iconLeft 输入框左边的 icon
* @param: iconRight 输入框右边的 icon
* @param: {...others } 是 input 的基本属性,可能有 placeholder、type 等
* @param: updateValue 回掉函数，把输入的内容传递给调用该组件的父组件
**/

const InputGroup = props => {
  const { iconLeft, iconRight, updateValue, ...others } = props
  return (
    <section className="input-group-dark">
      <i className={`icon icon-left ${iconLeft}`} />
      <input
        className="input input-block"
        onChange={event => updateValue(event.target.value.trim())}
        {...others}
      />
      {iconRight ? <i className={`icon icon-right ${iconRight}`} /> : ''}
    </section>
  )
}

InputGroup.propTypes = {
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  updateValue: PropTypes.func.isRequired,
}

export default InputGroup
