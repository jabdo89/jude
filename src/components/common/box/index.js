import React from "react";
import PropTypes from "prop-types";
import StyledBox from "./elements";
import propTypes from "@styled-system/prop-types";

const Box = ({ clickable, ...props }) => (
  <StyledBox clickable={clickable} {...props} />
);

Box.defaultProps = {
  clickable: false
};

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.color,
  ...propTypes.typography,
  ...propTypes.flexbox,
  ...propTypes.grid,
  clickable: PropTypes.bool
};

export default Box;
