import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toasts }) {
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map(({ id, variant, message, onClose }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast variant={variant} onClose={onClose}>{message}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
