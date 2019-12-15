import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';
import ModalPortal from '@templates/modal-portal';
import Button from '@common/button';
import Loader from '@common/loader';
import {
  ModalContainer,
  ModalBox,
  ModalTitle,
  CloseButton,
  ModalActions,
  PseudoContainer,
  ContentHeader,
  ContentBody,
  ContentFooter
} from './elements';

class Modal extends Component {
  componentDidUpdate = prevProps => {
    const { active } = this.props;
    const { body } = document;
    if (prevProps.active !== active) {
      if (active) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = null;
      }
    }
  };

  render() {
    const {
      children,
      title,
      active,
      closeButton,
      primaryAction,
      primaryVariant,
      primaryText,
      primaryColor,
      secondaryAction,
      secondaryVariant,
      secondaryText,
      secondaryColor,
      loading,
      size,
      zIndex
    } = this.props;
    return (
      <Fragment>
        {active && (
          <ModalPortal>
            <ModalContainer zIndex={zIndex}>
              <ModalBox size={size} animate={active}>
                {title ? (
                  <ContentHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseButton onClick={closeButton}>
                      <FiX />
                    </CloseButton>
                  </ContentHeader>
                ) : (
                  <CloseButton onClick={closeButton}>
                    <FiX />
                  </CloseButton>
                )}
                <ContentBody>{children}</ContentBody>
                {(secondaryAction || primaryAction) && (
                  <ContentFooter>
                    <ModalActions>
                      {loading ? (
                        <Loader />
                      ) : (
                        <Fragment>
                          {secondaryAction && (
                            <Button
                              variant={secondaryVariant}
                              color={secondaryColor}
                              onClick={secondaryAction}
                              mr={10}
                            >
                              {secondaryText}
                            </Button>
                          )}
                          {primaryAction && (
                            <Button
                              variant={primaryVariant}
                              color={primaryColor}
                              onClick={primaryAction}
                            >
                              {primaryText}
                            </Button>
                          )}
                        </Fragment>
                      )}
                    </ModalActions>
                  </ContentFooter>
                )}
              </ModalBox>
              <PseudoContainer onClick={closeButton} />
            </ModalContainer>
          </ModalPortal>
        )}
      </Fragment>
    );
  }
}

Modal.defaultProps = {
  title: '',
  primaryAction: null,
  primaryVariant: '',
  primaryText: 'Confirm',
  primaryColor: 'primary',
  secondaryAction: null,
  secondaryVariant: '',
  secondaryText: 'Cancel',
  secondaryColor: 'danger',
  loading: false,
  size: '',
  zIndex: '3000'
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
  active: PropTypes.bool.isRequired,
  closeButton: PropTypes.func.isRequired,
  primaryAction: PropTypes.func,
  primaryVariant: PropTypes.string,
  primaryText: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryAction: PropTypes.func,
  secondaryVariant: PropTypes.string,
  secondaryText: PropTypes.string,
  secondaryColor: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.string,
  zIndex: PropTypes.string
};

export default Modal;
