import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../../atoms/Button';
import { ReactComponent as CrossIcon } from '../../../assets/cross.svg';

import styles from './DeleteModal.module.scss';

const DeleteModal = ({
  deviceName,
  onDeleteClick,
  onCancelClick
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  return (
    <div data-testid='delete-modal' className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Delete Device?</h2>
          <button
            aria-label='Close modal'
            onClick={onCancelClick}
            className={styles.modal__close}
          >
            <CrossIcon className={styles.modal__closeIcon} />
          </button>
        </div>
        <span className={styles.modal__text}>
          You are about to delete the device <span>{deviceName}</span>
          . This action cannot be undone.
        </span>
        <div className={styles.modal__buttons}>
          <Button
            onClick={onCancelClick}
            text={'Cancel'}
            variant={'secondary'}
          />
          <Button
            onClick={onDeleteClick}
            text={'Delete'}
            variant={'danger'}
          />
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  deviceName: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};

export default DeleteModal;
