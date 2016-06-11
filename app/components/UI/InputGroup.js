import React, { PropTypes } from 'react'
/**
* @param: iconLeft 输入框左边的 icon
* @param: iconRight 输入框右边的 icon
* @param: type, placeholder 是 input 的基本属性
* @param: updateValue 回掉函数，把输入的内容传递给调用该组件的父组件
**/

class InputGroup extends React.Component {
  componentDidMount() {
    this.props.updateValue(this.refs.input.value.trim())
  }
  onBlur() {
    const text = this.refs.input.value.trim()
    if(text) this.props.updateValue(text)
  }
  render() {
    const { iconLeft, iconRight, type, placeholder } = this.props
    return (
      <section className="input-group-dark">
        <i className={`icon icon-left ${iconLeft}`} />
        <input
          onBlur={this.onBlur.bind(this)}
          className="input input-block"
          ref="input"
          type={ type }
          placeholder={ placeholder }
        />

        {iconRight ? <i className={`icon icon-right ${iconRight}`} /> : ''}
      </section>
    )
  }
}

InputGroup.propTypes = {
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
}

export default InputGroup
