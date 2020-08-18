import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdClear, MdThumbUp, MdCheckCircle, MdInfo, MdCancel, MdWarning } from 'react-icons/md';
import Typography from '@common/typography';
import { Container, CloseContainer, TextContainer, MainIconContainer } from './elements';

const getIcon = type => {
  switch (type) {
    case 'primary':
      return <MdThumbUp />;
    case 'success':
      return <MdCheckCircle />;
    case 'info':
      return <MdInfo />;
    case 'default':
      return <MdInfo />;
    case 'secondary':
      return <MdWarning />;
    case 'warning':
      return <MdWarning />;
    case 'danger':
      return <MdCancel />;
    default:
      return <MdThumbUp />;
  }
};

class ToastComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoingToBeRemoved: false
    };
  }

  componentDidMount = () => this.startCounting();

  cancelCounting = () => clearTimeout(this.timeOut);

  startCounting = () => {
    const { options } = this.props;
    this.timeOut = setTimeout(() => {
      this.setState({ isGoingToBeRemoved: true });
    }, options.autoClose);
  };

  remove = () => {
    const { removeElements } = this.props;
    const { isGoingToBeRemoved } = this.state;
    if (isGoingToBeRemoved) {
      removeElements();
    }
  };

  forceRemove = () => {
    this.setState({ isGoingToBeRemoved: true });
    this.remove();
  };

  render() {
    const { title, message, type } = this.props;
    const { isGoingToBeRemoved } = this.state;
    return (
      <Container
        onAnimationEnd={this.remove}
        onFocus={this.cancelCounting}
        onMouseOver={this.cancelCounting}
        onMouseLeave={this.startCounting}
        type={type}
        isGoingToBeRemoved={isGoingToBeRemoved}
        onClick={this.forceRemove}
      >
        <CloseContainer onClick={this.forceRemove}>
          <MdClear />
        </CloseContainer>
        <MainIconContainer>{getIcon(type)}</MainIconContainer>
        <TextContainer>
          <Typography uppercase fontWeight="bold" fontSize="14px">
            {title}
          </Typography>
          {message && (
            <Typography mt="5" fontSize="12px">
              {message}
            </Typography>
          )}
        </TextContainer>
      </Container>
    );
  }
}

ToastComponent.defaultProps = {
  message: ''
};

ToastComponent.propTypes = {
  removeElements: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  type: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export default ToastComponent;
