import React from 'react'
import {TextField} from 'react-md'
import PropTypes from 'prop-types'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

export default class MaskedInput extends TextField {
  constructor(...args) {
    super(...args)

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  initTextMask = () => {
    this.input = this.getField()
    const {props, props: {value}} = this
    this.textMaskInputElement = createTextMaskInputElement({
      inputElement: this.input,
      ...props,
    })
    this.textMaskInputElement.update(value)
  }

  componentDidMount() {
    super.componentDidMount()
    this.initTextMask()
    this.input.addEventListener('keyup', this.onChange)
    this.input.addEventListener('blur', this.onBlur)
  }

  componentDidUnmount() {
    super.componentDidUnmount()
    this.input.removeEventListener('keyup', this.onChange)
    this.input.removeEventListener('blur', this.onBlur)
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps)
    this.initTextMask()
  }

  render() {
    //const {...props} = this.props

    //delete props.mask
    //delete props.guide
    //delete props.pipe
    //delete props.placeholderChar
    //delete props.keepCharPositions
    //delete props.value
    //delete props.onBlur
    //delete props.onChange
    //delete props.showMask

    //const ref = (inputElement) => (this.inputElement = inputElement)

    return super.render()

    //return render(ref, {
    //  onBlur: this.onBlur,
    //  onChange: this.onChange,
    //  defaultValue: this.props.value,
    //  ...props,
    //})
  }

  onChange(event) {
    this.textMaskInputElement.update()

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }

  onBlur(event) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }
}

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.bool,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func,
    }),
  ]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool,
  ...TextField.propTypes,
}

MaskedInput.defaultProps = {
  render: (ref, props) => <input ref={ref} {...props} />,
  ...TextField.defaultProps
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
