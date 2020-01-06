import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal';

const NewOfferModal = ({ active, closeButton }) => (
  <Modal size="large" title="Add a new offer" active={active} closeButton={closeButton}>
    <p>hola</p>
  </Modal>
);

NewOfferModal.propTypes = {
  active: PropTypes.bool.isRequired,
  closeButton: PropTypes.func.isRequired
};

export default NewOfferModal;
