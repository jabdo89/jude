import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

class NavbarActionPortal extends Component {
  constructor(props) {
    super(props);
    this.action = document.createElement('div');
    this.state = {
      actionLoaded: false
    };
  }

  componentDidMount = () => this.setActionContainer();

  setActionContainer = () => {
    const { actionLoaded } = this.state;
    const actionDiv = document.getElementById('action');
    if (!actionLoaded && actionDiv) {
      actionDiv.appendChild(this.action);
      this.setState({ actionLoaded: true });
    }
  };

  componentDidUpdate = () => this.setActionContainer();

  render() {
    const { children } = this.props;

    return createPortal(children, this.action);
  }
}

NavbarActionPortal.defaultProps = {
  children: undefined
};

NavbarActionPortal.propTypes = {
  children: PropTypes.any
};

export default NavbarActionPortal;
