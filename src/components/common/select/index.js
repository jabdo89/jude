import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';
import {
  Container,
  PseudoSelect,
  Label,
  Message,
  LeftIconContainer,
  OptionsButton,
  SelectGroup,
  Prefix
} from './elements';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggleActive = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  render() {
    const {
      label,
      leftIcon,
      id,
      success,
      warning,
      error,
      message,
      value,
      onChange,
      children,
      prefix,
      selectIcon,
      className,
      align,
      ...props
    } = this.props;
    const { active } = this.state;
    return (
      <Container
        className={className}
        onFocus={this.toggleActive}
        onBlur={this.toggleActive}
        {...props}
      >
        {label && (
          <Label weight="light" htmlFor={id}>
            {label}
            {props.required && '*'}
          </Label>
        )}
        {leftIcon && (
          <LeftIconContainer
            success={success}
            warning={warning}
            error={error}
            message={message}
            active={active}
          >
            {leftIcon}
          </LeftIconContainer>
        )}
        <SelectGroup>
          {prefix && (
            <Prefix leftIcon={leftIcon} success={success} warning={warning} error={error}>
              {prefix}
            </Prefix>
          )}
          <PseudoSelect
            id={id}
            label={label}
            value={value}
            onChange={onChange}
            success={success}
            warning={warning}
            error={error}
            leftIcon={leftIcon}
            prefix={prefix}
            {...props}
          >
            {children}
          </PseudoSelect>
          <OptionsButton label={label} message={message}>
            {selectIcon || <FiChevronDown />}
          </OptionsButton>
        </SelectGroup>
        {message && (
          <Message success={success} warning={warning} error={error}>
            {message}
          </Message>
        )}
      </Container>
    );
  }
}

Input.defaultProps = {
  label: '',
  leftIcon: '',
  select: false,
  id: null,
  success: false,
  warning: false,
  error: false,
  message: '',
  children: '',
  prefix: '',
  selectIcon: '',
  className: '',
  align: 'left'
};

Input.propTypes = {
  label: PropTypes.string,
  leftIcon: PropTypes.any,
  select: PropTypes.bool,
  id: PropTypes.string,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.any,
  prefix: PropTypes.string,
  selectIcon: PropTypes.any,
  className: PropTypes.string,
  align: PropTypes.string
};

export default Input;
