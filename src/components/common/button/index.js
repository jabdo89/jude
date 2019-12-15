import React from "react";
import PropTypes from "prop-types";
import DefaultButton from "./elements";
import propTypes from "@styled-system/prop-types";

const Button = ({
  children,
  color,
  uppercase,
  fullWidth,
  disabled,
  ...props
}) => (
  <DefaultButton
    children={children}
    color={color}
    uppercase={uppercase}
    fullWidth={fullWidth}
    disabled={disabled}
    {...props}
  />
);

Button.defaultProps = {
  uppercase: true,
  color: "default",
  fullWidth: false,
  disabled: false
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  uppercase: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.typography
};

export default Button;
