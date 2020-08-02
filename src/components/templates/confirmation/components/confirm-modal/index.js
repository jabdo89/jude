import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@common/card';
import Button from '@common/button';
// import Input from '@common/input';
import {
  ModalContainer,
  ModalBox,
  ModalTitleContainer,
  ModalTitle,
  ModalActions,
  PseudoContainer
} from './elements';

class ConfirmModal extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     textInput: ''
  //   };
  // }

  componentDidMount = () => {
    const { body } = document;
    body.style.overflow = 'hidden';
  };

  componentWillUnmount = () => {
    const { body } = document;
    body.style.overflow = null;
  };

  // handleInputChange = ({ target: { value } }) => this.setState({ textInput: value });

  render() {
    // const { textInput } = this.state;
    const { confirm, cancel, title } = this.props;
    return (
      <ModalContainer>
        <ModalBox animate>
          <Card>
            <ModalTitleContainer>
              <ModalTitle>{title}</ModalTitle>
            </ModalTitleContainer>
            {/* {(message || textProof.text) && (
              <ModalBody>
                {message}
                {textProof.text && (
                  <Input
                    value={textInput}
                    onChange={this.handleInputChange}
                    label={textProof.description || `Type '${textProof.text}' to confirm`}
                  />
                )}
              </ModalBody>
            )} */}
            <ModalActions>
              <Button size="large" color="default" mr={20} variant="outlined" onClick={cancel}>
                Cancel
              </Button>
              <Button size="large" color="primary" onClick={confirm}>
                Confirm
              </Button>
            </ModalActions>
          </Card>
        </ModalBox>
        <PseudoContainer onClick={cancel} />
      </ModalContainer>
    );
  }
}

ConfirmModal.defaultProps = {
  // message: null,
  title: 'Are you sure?'
};

ConfirmModal.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default ConfirmModal;
