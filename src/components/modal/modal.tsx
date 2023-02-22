import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModal {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal = ({ onClose, children, title }: IModal) => {
  const reactModals = document.getElementById('react-modals') as HTMLElement;

  const handleEscape = (event: KeyboardEvent) => {
    if (event.type === 'keydown' && event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.closeModalButton} onClick={() => onClose()}>
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

export default Modal;
