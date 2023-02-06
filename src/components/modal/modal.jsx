import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, title, closeModal }) => {
  useEffect(() => {
    const escHendler = evt => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', escHendler);
    return () => {
      document.removeEventListener('keydown', escHendler);
    };
  }, [closeModal]);

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={`${styles.wrapper} p-10`} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button className="btn-default" onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
