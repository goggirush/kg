import ReactModal from 'react-modal';
import styles from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const Modal = ({ isOpen, onRequestClose, children, title }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      <div>{children}</div>
    </ReactModal>
  );
};

export default Modal;
