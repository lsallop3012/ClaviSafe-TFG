import { useEffect, useState } from 'react';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) setBusy(false);
  }, [open]);

  if (!open) return null;

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  };

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget && !busy) onCancel();
  };

  return (
    <div className={styles.backdrop} onClick={onBackdrop}>
      <div className={styles.dialog} role="dialog" aria-modal="true">
        <h3 className={styles.title}>{title}</h3>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.btn} disabled={busy}>
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={danger ? styles.btnDanger : styles.btnPrimary}
            disabled={busy}
          >
            {busy ? 'Working...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
