import React from "react";
import PropTypes from "prop-types";
import LoaderWrapper from "./elements";
import propTypes from "@styled-system/prop-types";
import Box from "../box";

const Loader = ({ size, alignSelf, className, color, ...props }) => (
  <LoaderWrapper
    className={className}
    size={size}
    alignSelf={alignSelf}
    color={color}
    {...props}
  >
    <div />
    <div />
    <div />
    <div />
  </LoaderWrapper>
);

const LoaderContainer = ({ ...props }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  ></Box>
);

Loader.defaultProps = {
  size: "35",
  alignSelf: "",
  className: "",
  color: "secondary"
};

Loader.propTypes = {
  size: PropTypes.string,
  alignSelf: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  ...propTypes.space
};

export { LoaderContainer };

export default Loader;
