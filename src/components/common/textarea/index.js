import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { TextAreaContainer, Label, TextAreaContent } from './elements';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.box = createRef();
  }

  handleKeyUp = () => {
    const height = this.box.current.offsetHeight;
    if (height < this.box.current.scrollHeight) {
      this.box.current.style.height = `${this.box.current.scrollHeight}px`;
    }
  };

  render() {
    const {
      id,
      onChange,
      autofocus,
      value,
      required,
      placeholder,
      label,
      name,
      rows,
      className,
      ...props
    } = this.props;
    return (
      <TextAreaContainer className={className} {...props}>
        {label && (
          <Label weight="light" htmlFor={id}>
            {label}
            {required && '*'}
          </Label>
        )}
        <TextAreaContent
          autoFocus={autofocus}
          label={label}
          value={value}
          name={name}
          required={required}
          placeholder={placeholder}
          id={id}
          ref={this.box}
          onKeyUp={this.handleKeyUp}
          onChange={onChange}
          rows={rows}
        />
      </TextAreaContainer>
    );
  }
}

TextArea.defaultProps = {
  onChange: () => {},
  autofocus: null,
  placeholder: null,
  label: null,
  required: null,
  id: '',
  name: '',
  rows: '3',
  className: ''
};

TextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  autofocus: PropTypes.bool,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.string,
  className: PropTypes.string
};

export default TextArea;
