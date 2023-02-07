import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, closeModal }) => {
  return (
    <div className={styles.overlay} onClick={closeModal}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;
