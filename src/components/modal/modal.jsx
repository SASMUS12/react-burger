import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const reactModals = document.getElementById('react-modals');

const Modal = ({ onClose, children, title }) => {
  useEffect(() => {
    const escHendler = evt => {
      if (evt.type === 'keydown' && evt.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', escHendler);
    return () => {
      document.removeEventListener('keydown', escHendler);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.closeModalButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
        {title && (
          <div className={`${styles.headerContainer} mt-10 ml-10 mr-10`}>
            <h2 className="text text_type_main-large">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </ModalOverlay>,
    reactModals
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Modal;
