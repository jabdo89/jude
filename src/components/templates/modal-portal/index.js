import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

class ModalPortal extends Component {
  modalsRoot = document.getElementById('modal');

  constructor(props) {
    super(props);
    this.modal = document.createElement('div');
  }

  componentDidMount = () => {
    this.modalsRoot.appendChild(this.modal);
  };

  componentWillUnmount = () => {
    this.modalsRoot.removeChild(this.modal);
  };

  render() {
    const { children } = this.props;
    return createPortal(children, this.modal);
  }
}

ModalPortal.propTypes = {
  children: PropTypes.element.isRequired
};

export default ModalPortal;
