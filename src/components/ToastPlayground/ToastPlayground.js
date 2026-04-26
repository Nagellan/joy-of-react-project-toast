import React, { useState } from 'react';

import { VARIANTS } from '../Toast';
import ToastShelf from '../ToastShelf';
import Button from '../Button';

import styles from './ToastPlayground.module.css';
import { useToasts } from '../ToastProvider/ToastProvider';

function ToastPlayground() {
  const [counter, setCounter] = useState(0);
  const toasts = useToasts()

  const onSubmit = (formData) => {
    const message = formData.get('message');
    let variant = formData.get('variant');

    if (!VARIANTS.includes(variant)) {
      variant = VARIANTS[0];
    }

    const id = counter;

    toasts.add({
      id,
      variant,
      message,
      onClose: () => toasts.remove(id)
    })
    setCounter(prev => prev + 1);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form action={onSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              name="message"
              required
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANTS.map((option) => (
              <label htmlFor={`variant-${option}`} key={option}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
