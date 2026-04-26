import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

export const VARIANTS = Object.keys(ICONS_BY_VARIANT);

function Toast({ variant, children, onClose }) {
  variant = VARIANTS.includes(variant) ? variant : VARIANTS[0];

  const IconTag = ICONS_BY_VARIANT[variant];

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconTag size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} —</VisuallyHidden> {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
