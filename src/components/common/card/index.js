import React from 'react';
import PropTypes from 'prop-types';
import {
  DefaultCard,
  CardHeaderContainer,
  Body,
  Footer,
  HeaderTitle,
  HeaderSubtitle
} from './elements';

const Card = ({ children, scaleOnHover, scale, ...props }) => (
  <DefaultCard scaleOnHover={scaleOnHover} scale={scale} {...props}>
    {children}
  </DefaultCard>
);

const CardHeader = ({ title, subtitle, ...props }) => (
  <CardHeaderContainer {...props}>
    {title && <HeaderTitle>{title}</HeaderTitle>}
    {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
  </CardHeaderContainer>
);

const CardBody = ({ children, ...props }) => <Body {...props}>{children}</Body>;

const CardFooter = ({ children, ...props }) => <Footer {...props}>{children}</Footer>;

Card.defaultProps = {
  scaleOnHover: false,
  scale: 1.021
};

Card.propTypes = {
  children: PropTypes.any.isRequired,
  scaleOnHover: PropTypes.bool,
  scale: PropTypes.number
};

CardBody.propTypes = {
  children: PropTypes.any.isRequired
};

CardFooter.propTypes = {
  children: PropTypes.any.isRequired
};

CardHeader.defaultProps = {
  subtitle: null
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export { Card, CardFooter, CardBody, CardHeader };
